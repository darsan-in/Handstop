#! node.exe

import { exec } from "child_process";
import decompress from "decompress";
import {
	createReadStream,
	createWriteStream,
	existsSync,
	mkdirSync,
	rmSync,
} from "fs";
import { get } from "https";
import { join } from "path";
import { format } from "util";

interface installationOptions {
	url: string;
	archive: string;
	copyFrom: string;
	copyTo: string;
}

function _getLatestRelease(owner: string, repo: string): Promise<string> {
	const options: Record<string, string | Record<string, string>> = {
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
		}).on("error", (err: Error) => {
			reject(`Error: ${err}`);
		});
	});
}

function _downloadFile(
	sourceUrl: string,
	to: string,
	done: Function,
): void {
	get(sourceUrl, (response) => {
		if (response.statusCode === 200) {
			const fileStream = createWriteStream(to);

			response.pipe(fileStream);

			fileStream.on("finish", () => {
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
	}).on("error", (err: Error) => {
		console.error(`Error downloading file: ${err}`);
	});
}

function _extractFile(
	archive: string,
	copyFrom: string,
	copyTo: string,
	done: Function,
): void {
	console.log("extracting: " + archive);

	const tempOPFolder: string = archive.split(".")[0];

	if (archive.indexOf(".zip") > 0) {
		decompress(archive, tempOPFolder).then(() => {
			const source = createReadStream(copyFrom);
			const dest = createWriteStream(copyTo);

			source.pipe(dest);

			dest.on("close", () => {
				rmSync(tempOPFolder, { recursive: true, force: true });
				done();
			});
		});
	} else if (archive.indexOf(".dmg") > 0) {
		const cmd: string = "hdiutil attach " + archive;

		exec(cmd, function (err, stdout) {
			if (err) {
				throw err;
			}

			const match = stdout.match(/^(\/dev\/\w+)\b.*(\/Volumes\/.*)$/m);

			if (match) {
				const devicePath = match[1];
				const mountPath = match[2];

				copyFrom = join(mountPath, copyFrom);

				const source = createReadStream(copyFrom);
				const dest = createWriteStream(copyTo, {
					mode: 755,
				});

				source.pipe(dest);

				dest.on("close", function () {
					exec("hdiutil detach " + devicePath, function (err) {
						if (err) throw err;
						done();
					});
				});
			}
		});
	} else {
		console.log("Unexpected format downloaded");
		process.exit(1);
	}
}

function install(installation: installationOptions): void {
	console.log("fetching: " + installation.url);

	_downloadFile(installation.url, installation.archive, () => {
		if (!existsSync("bin")) {
			mkdirSync("bin", { recursive: true });
		}

		_extractFile(
			installation.archive,
			installation.copyFrom,
			installation.copyTo,
			() => {
				console.log("HandbrakeCLI installation complete");
				rmSync(installation.archive, { recursive: true, force: true });
				process.exit(0);
			},
		);
	});
}

function go(installation: installationOptions, version: string): void {
	if (existsSync(installation.copyTo)) {
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

async function main(): Promise<void> {
	const downloadPath: string =
		"https://github.com/HandBrake/HandBrake/releases/download/%s/HandBrakeCLI-%s%s";

	const version: string = await _getLatestRelease(
		"HandBrake",
		"HandBrake",
	);

	if (process.platform === "darwin") {
		go(
			{
				url: format(downloadPath, version, version, ".dmg"),
				archive: "mac.dmg",
				copyFrom: "HandbrakeCLI",
				copyTo: join("bin", "HandbrakeCLI"),
			},
			version,
		);
	} else if (process.platform === "win32") {
		if (process.arch !== "x64") {
			console.log("Unsupported CPU");
			process.exit(1);
		}

		const archive: string = "cli.zip";

		go(
			{
				url: format(downloadPath, version, version, "-win-x86_64.zip"),
				archive: archive,
				copyFrom: join(archive.split(".")[0], "HandBrakeCLI.exe"),
				copyTo: join("bin", "HandbrakeCLI.exe"),
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
