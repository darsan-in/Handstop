import { exec } from "child_process";
import { mkdirSync } from "fs";
import { basename, dirname, extname, join, relative, resolve } from "path";
import process from "process";

/*
 * Execute handbrake cli with preferences.
 *@param {string} input - input videos path.
 *@param {string} output - output video path.
 *@param {string} preset_file - preset json file path.
 *@returns {Promise} stdout, stderror.
 */

export interface HandbrakeResponse {
	stdout: string;
	stderr: string;
}

const cli: string = join(__dirname, "../../bin/HandbrakeCLI.exe");
const handbrakeclipath: string = resolve(cli);

export function commandSpawn(
	input: string,
	output: string,
	preset_file: string,
	presetData: Record<string, any>,
): Promise<HandbrakeResponse> {
	/* Making absolute path */
	input = resolve(relative(process.cwd(), input));
	output = resolve(relative(process.cwd(), output));
	preset_file = resolve(relative(process.cwd(), preset_file));

	/* Output and input can't be same so making difference */
	if (input === output) {
		output = output.split(".")[0] + "(compressed)" + extname(output);
	}

	const preset_name: string = presetData.PresetName;
	const expectedFiletype: string = presetData.FileFormat.split("_")[1];
	const targetFiletype: string = extname(output).slice(1);

	//file type validation
	if (expectedFiletype !== targetFiletype) {
		console.log(
			`Output file type is mismatched: ${expectedFiletype} in preset, ${targetFiletype} is given (${basename(
				output,
			)})`,
		);

		output =
			output.slice(0, output.length - targetFiletype.length) +
			expectedFiletype;

		console.log(
			`Changed to relevent filetype and will written as ${basename(
				output,
			)}`,
		);
	}

	//Make directories if required
	mkdirSync(dirname(output), { recursive: true });

	const command: string = `"${handbrakeclipath}" --input "${input}" --output "${output}" --preset-import-file "${preset_file}" --preset "${preset_name}"`;

	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
			if (error) reject(error);
			else resolve({ stdout: stdout, stderr: stderr });
		}).on("error", (error: Error) => {
			reject(error.message);
		});
	});
}

function killStaleProc() {
	const command: string = `taskkill /F /IM HandbrakeCLI.exe`;
	exec(command, (error) => {
		if (error) {
			console.log(`Error: ${error}`);
			process.exit(1);
		}

		console.log(`Stale processess are killed.`);
		process.exit(0);
	});
}

process.on("SIGINT", () => {
	killStaleProc();
});
