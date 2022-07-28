import fs from 'fs';
import * as apps from "@polkadot/apps-config/api";
import type { OverrideBundleDefinition } from '@polkadot/types/types';

import { argv } from './cli';

enum ExitCodes {
    Success = 0,
    Failure = 1
}

const availableChainTypes = (specs: Record<string, OverrideBundleDefinition>) => {
    const keys = Object.keys(specs);
    for (const key of keys) {
        console.log(key)
    }
}

const writeJson = (path: string, data: { spec: Record<string, OverrideBundleDefinition>; }) => {
    fs.writeFile(path, JSON.stringify(data, null, 2), (err) => {
        if (err) console.log(err)
    });
}

const main = (): number => {
    const { Success } = ExitCodes;
    const specs = apps.typesBundle.spec;
    const args = argv();
    /**
     * This is an unusual case, but necessary for the typescript compiler. There are rare cases where this might come back
     * undefined when using a very old version of apps-config.
     */
    if (!specs) {
        throw Error('Specs from apps-config is undefined, there are no types-bundles available');
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
     * Set the path in which we will generate the files in.
     */
    const path = args.p;
    const exists = fs.existsSync(path);
    if (!exists) throw Error('The inputted path does not exist.');
    const isDir = fs.lstatSync(path).isDirectory();
    if (!isDir) throw Error('Please input a correct path. Inputted path is not a directory.');
    /**
     * Create the structure of the data for the types bundle
     */
    let typesBundle = { spec: specs };
    if (args.s) {
        if (!specs[args.s]) throw Error('The inputted chain name does not exist within apss-config.');
        const updatedBundle = { spec: {} };
        updatedBundle.spec[args.s] = specs[args.s];
        typesBundle = updatedBundle;
    }

    writeJson(path + '/typesBundle.json', typesBundle);

    return Success;
}

main();
