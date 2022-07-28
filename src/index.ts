import fs from 'fs';
import * as apps from "@polkadot/apps-config/api";
import type { OverrideBundleDefinition } from '@polkadot/types/types';

import { parseArgs } from './cli';

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
    const args = parseArgs();
    const specs = apps.typesBundle.spec;

    /**
     * This is an unusual case, but necessary for the typescript compiler. There are rare cases where this might come back
     * undefined when using a very old version of apps-config.
     */
    if (!specs) {
        throw Error('Specs from apps-config is undefined, there are no types-bundles available');
    }

    if (args.availableChains) {
        availableChainTypes(specs);
        return Success;
    }

    writeJson(__dirname + '/../typesBundle.json', { spec: specs });

    return Success;
}

main();
