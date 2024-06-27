import { join } from "path";

interface levelOptions {
	level1: string;
	level2: string;
	level3: string;
}

interface presetStructure {
	//AV1 encoder - software level
	mp4Av1: levelOptions;
	//nvdia h265 encoder - hardware level
	mp4Nvdia: levelOptions;
	//AV1 encoder - software level
	webmAv1: levelOptions;
}

//presets
export const presets: presetStructure = {
	//AV1 encoder - software level
	mp4Av1: {
		level1: join(__dirname, "../presets/mp4_av1-L1.json"),
		level2: join(__dirname, "../presets/mp4_av1-L2.json"),
		level3: join(__dirname, "../presets/mp4_av1-L3.json"),
	},
	//nvdia h265 encoder - hardware level
	mp4Nvdia: {
		level1: join(__dirname, "../presets/mp4_nvdia-L1.json"),
		level2: join(__dirname, "../presets/mp4_nvdia-L2.json"),
		level3: join(__dirname, "../presets/mp4_nvdia-L3.json"),
	},
	//AV1 encoder - software level
	webmAv1: {
		level1: join(__dirname, "../presets/webm_av1-L1.json"),
		level2: join(__dirname, "../presets/webm_av1-L2.json"),
		level3: join(__dirname, "../presets/webm_av1-L3.json"),
	},
};

export type presetOptions = "mav1" | "wav1" | "mx265";
