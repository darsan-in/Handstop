import { readFileSync } from "fs";
import { join, relative } from "path";
import { presetOptions, presets } from "./lib/presets";
import { HandbrakeResponse, commandSpawn } from "./lib/util";

interface PresetBrokerResponse {
	presetFile: string;
	presetData: Record<string, any>;
}

function _presetBroker(
	preset: presetOptions,
	level: number,
): PresetBrokerResponse {
	if (level > 3) {
		console.log("Only three(3) levels are available");
		process.exit(1);
	}

	let preset_file: string = "";
	if (preset === "mav1") {
		preset_file =
			level === 3
				? presets.mp4Av1.level3
				: level === 2
				? presets.mp4Av1.level2
				: presets.mp4Av1.level1;
	} else if (preset === "wav1") {
		preset_file =
			level === 3
				? presets.webmAv1.level3
				: level === 2
				? presets.webmAv1.level2
				: presets.webmAv1.level1;
	} else if (preset === "mx265") {
		preset_file =
			level === 3
				? presets.mp4Nvdia.level3
				: level === 2
				? presets.mp4Nvdia.level2
				: presets.mp4Nvdia.level1;
	}

	const presetData = JSON.parse(
		readFileSync(preset_file, { encoding: "utf-8" }),
	).PresetList[0];

	return { presetFile: preset_file, presetData: presetData };
}

export function encode(
	inputVideo: string,
	outputVideo: string,
	preset: presetOptions,
	level: number,
): Promise<HandbrakeResponse> {
	const { presetFile, presetData } = _presetBroker(preset, level);

	return new Promise((resolve, reject) => {
		commandSpawn(inputVideo, outputVideo, presetFile, presetData)
			.then((response: HandbrakeResponse) => {
				resolve(response);
			})
			.catch((error: Error) => {
				reject(error.message);
			});
	});
}

interface EncodeAllResponse {
	success: boolean;
	resposes: HandbrakeResponse[];
}

export async function encodeAll(
	inputVideos: string[],
	outputDest: string,
	preset: presetOptions,
	level: number,
	batchSize: number,
): Promise<EncodeAllResponse> {
	const { presetFile, presetData } = _presetBroker(preset, level);

	const outputPromises: (() => Promise<HandbrakeResponse>)[] =
		inputVideos.map((inputVideo: string) => {
			return (): Promise<HandbrakeResponse> => {
				const outputVideo: string = join(
					outputDest,
					relative(process.cwd(), inputVideo),
				);

				return new Promise((resolve, reject) => {
					commandSpawn(inputVideo, outputVideo, presetFile, presetData)
						.then((response: HandbrakeResponse) => {
							resolve(response);
						})
						.catch((error: Error) => {
							reject(error);
						});
				});
			};
		});

	//batching
	const promiseBatches: (() => Promise<HandbrakeResponse>)[][] = [];

	for (let i: number = 0; i < outputPromises.length; i += batchSize) {
		promiseBatches.push(outputPromises.slice(i, i + batchSize));
	}

	/* Resolving batches */
	const responses: HandbrakeResponse[] = [];

	for (const batch of promiseBatches) {
		const activatedBatch: Promise<HandbrakeResponse>[] = batch.map(
			(func) => func(),
		);

		try {
			const batchResponses = await Promise.all(activatedBatch);

			responses.push(...batchResponses);
		} catch (error) {
			console.log(error);
			process.exit(1);
		}
	}

	return { success: true, resposes: responses };
}
