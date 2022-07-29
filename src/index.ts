import * as apps from '@polkadot/apps-config/api';
import type {
	OverrideBundleDefinition,
	OverrideBundleType,
} from '@polkadot/types/types';
import fs from 'fs';

import { ArgsType, argv } from './cli';

enum ExitCodes {
	Success = 0,
	Failure = 1,
}

const writeJson = (path: string, data: OverrideBundleType): void => {
	fs.writeFile(path, JSON.stringify(data, null, 2), (err) => {
		if (err) console.log(err);
	});
};

const availableChainTypes = (
	specs: Record<string, OverrideBundleDefinition>
): void => {
	const keys = Object.keys(specs);
	for (const key of keys) {
		console.log(key);
	}
};

const createTypesBundle = (
	args: ArgsType,
	specs: Record<string, OverrideBundleDefinition>
): OverrideBundleType => {
	let typesBundle = { spec: specs };
	if (args.s) {
		if (!specs[args.s])
			throw Error('The inputted chain name does not exist within apss-config.');
		const updatedBundle = { spec: {} };
		updatedBundle.spec[args.s] = specs[args.s];
		typesBundle = updatedBundle;
	}

	return typesBundle;
};

const setPath = (args: ArgsType): string => {
	const path = args.p as string;
	const exists = fs.existsSync(path);
	if (!exists) throw Error('The inputted path does not exist.');
	const isDir = fs.lstatSync(path).isDirectory();
	if (!isDir)
		throw Error(
			'Please input a correct path. Inputted path is not a directory.'
		);

	return path;
};

const main = (): number => {
	const { Success, Failure } = ExitCodes;
	const specs = apps.typesBundle.spec;
	const args = argv();
	/**
	 * This is an unusual case, but necessary for the typescript compiler. There are rare cases where this might come back
	 * undefined when using a very old version of apps-config, or in the case that the `chain` key is available and not
	 * the `spec` key.
	 */
	if (!specs) {
		throw Error(
			'Specs from apps-config is undefined, there are no types-bundles available'
		);
	}
	/**
	 * Should exit the program when availableChains flag is called.
	 * It will list all the available chains from apps-config.
	 */
	if (args.a) {
		availableChainTypes(specs);
		return Success;
	}
	/**
	 * Check if the -p or --path flag is inputted. We bypass the yargs library in order to ensure we can use other flags
	 * if needed.
	 */
	if (!args.p) {
		console.log(
			'Please input a path using the `-p` or `--path` flag as it is required.'
		);
		return Failure;
	}
	/**
	 * Set the path in which we will generate the files in.
	 */
	const path = setPath(args);
	/**
	 * Create the data for the types bundle.
	 */
	const typesBundle = createTypesBundle(args, specs);
	/**
	 * Write the JSON file for the types bundle.
	 */
	writeJson(path + '/typesBundle.json', typesBundle);

	return Success;
};

(function () {
	const m = main();

	if (m === 0) {
		console.log('Succesfully generated your types bundle. Exiting.');
		process.exit(0);
	} else if (m === 1) {
		console.log(
			'There seemed to be a problem when generating your types bundle. Consult the above errors. Exiting.'
		);
		process.exit(1);
	}
})();
