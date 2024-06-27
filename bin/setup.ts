#! node.exe

import { exec } from "child_process";
import decompress from "decompress";
import fs from "fs";
import { get } from "https";
import path from "path";
import { rimrafSync } from "rimraf";
import util from "util";

async function _getLatestRelease(
	owner: string,
	repo: string,
): Promise<string> {
	const options = {
		hostname: "api.github.com",
		path: `/repos/${owner}/${repo}/releases/latest`,
		method: "GET",
		headers: {
			"User-Agent": "node.js",
			Accept: "application/vnd.github.v3+json",
		},
	};

	return new Promise((resolve, reject) => {
		get(options, (res) => {
			let data = "";

			res.on("data", (chunk) => {
				data += chunk;
			});

			res.on("end", () => {
				if (res.statusCode === 200) {
					const latestRelease = JSON.parse(data);

					resolve(latestRelease.tag_name);
				} else {
					reject(
						`Failed to fetch the latest release. Status code: ${res.statusCode}`,
					);
				}
			});
		}).on("error", (err) => {
			reject(`Error: ${err.message}`);
		});
	});
}

function _downloadFile(from: string, to: string, done: () => {}) {
	console.log("fetching: " + from);

	get(from, (response) => {
		if (response.statusCode === 200) {
			console.log(
				`Downloading HandbrakeCLI (${Number(
					response.headers["content-length"],
				).toLocaleString()} bytes) `,
			);

			const fileStream = fs.createWriteStream(to);
			response.pipe(fileStream);

			fileStream.on("finish", () => {
				console.log(`File downloaded successfully to ${to}`);
				done();
			});
		} else if (response.statusCode === 302) {
			const redirectedUrl: string = response.headers.location as string;
			_downloadFile(redirectedUrl, to, done);
			return;
		} else {
			throw new Error(
				`Failed to download Handbrake: ${response.statusCode} ${response.statusMessage}`,
			);
		}
	}).on("error", (err) => {
		console.error(`Error downloading file: ${err.message}`);
	});
}

function _extractFile(
	archive: string,
	copyFrom: string,
	copyTo: string,
	done: () => {},
) {
	console.log("extracting: " + copyFrom);

	if (archive.indexOf(".zip") > 0) {
		if (!fs.existsSync("unzipped")) fs.mkdirSync("unzipped");
		decompress(archive, "unzipped").then(() => {
			const source = fs.createReadStream(copyFrom);
			const dest = fs.createWriteStream(copyTo);

			dest.on("close", function () {
				rimrafSync("unzipped");
				done();
			});

			source.pipe(dest);
		});
	} else if (archive.indexOf(".dmg") > 0) {
		const cmd: string = "hdiutil attach " + archive;
		exec(cmd, function (err, stdout) {
			if (err) throw err;

			const match = stdout.match(/^(\/dev\/\w+)\b.*(\/Volumes\/.*)$/m);

			if (match) {
				const devicePath = match[1];
				const mountPath = match[2];

				copyFrom = path.join(mountPath, copyFrom);

				const source = fs.createReadStream(copyFrom);
				const dest = fs.createWriteStream(copyTo, {
					mode: 755,
				});

				dest.on("close", function () {
					exec("hdiutil detach " + devicePath, function (err) {
						if (err) throw err;
						done();
					});
				});
				source.pipe(dest);
			}
		});
	} else {
		console.log("Unexpected format downloaded");
		process.exit(1);
	}
}

function install(installation: installationOptions) {
	_downloadFile(installation.url, installation.archive, function () {
		if (!fs.existsSync("bin")) fs.mkdirSync("bin");

		_extractFile(
			installation.archive,
			installation.copyFrom,
			installation.copyTo,
			function () {
				console.log("HandbrakeCLI installation complete");
				fs.unlinkSync(installation.archive);
				process.exit(0);
			} as any,
		);
	} as any);
}

interface installationOptions {
	url: string;
	archive: string;
	copyFrom: string;
	copyTo: string;
}

function go(installation: installationOptions, version: string) {
	if (fs.existsSync(path.resolve(__dirname, "..", installation.copyTo))) {
		exec(
			installation.copyTo + " --version",
			function (err, stdout, _stderr) {
				if (err) throw err;

				if (stdout.match(version)) {
					console.log(
						"You already have the latest HandbrakeCLI installed",
					);
				} else {
					install(installation);
				}
			},
		);
	} else {
		install(installation);
	}
}

async function main() {
	const downloadPath =
		"https://github.com/HandBrake/HandBrake/releases/download/%s/HandBrakeCLI-%s%s";

	const version: string = await _getLatestRelease(
		"HandBrake",
		"HandBrake",
	);

	if (process.platform === "darwin") {
		go(
			{
				url: util.format(downloadPath, version, version, ".dmg"),
				archive: "mac.dmg",
				copyFrom: "HandbrakeCLI",
				copyTo: path.join("bin", "HandbrakeCLI"),
			},
			version,
		);
	} else if (process.platform === "win32") {
		if (process.arch !== "x64") {
			console.log("Unsupported CPU");
			process.exit(1);
		}

		go(
			{
				url: util.format(
					downloadPath,
					version,
					version,
					"-win-x86_64.zip",
				),
				archive: "win.zip",
				copyFrom: path.join("unzipped", "HandBrakeCLI.exe"),
				copyTo: path.join("bin", "HandbrakeCLI.exe"),
			},
			version,
		);
	} else if (process.platform === "linux") {
		console.log(`Linux users
	============
	handbrake-cli must be installed separately as the root user.
	Ubuntu users can do this using the following commands:

	add-apt-repository --yes ppa:stebbins/handbrake-releases
	apt-get update -qq
	apt-get install -qq handbrake-cli

	For all issues regarding installation of HandbrakeCLI on Linux, consult the Handbrake website:
	http://handbrake.fr`);
	}
}

main().catch((err: Error) => {
	console.log(err.message);
	process.exit(1);
});
