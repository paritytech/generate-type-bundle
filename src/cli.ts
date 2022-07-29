import yargs from 'yargs';

import packageJSON from '../package.json';

export interface ArgsType {
	[x: string]: unknown;
	p?: string;
	s?: string;
	a: unknown;
	_: (string | number)[];
	$0: string;
}

export const argv = (): ArgsType => {
	return yargs.version(packageJSON.version).options({
		p: {
			alias: 'path',
			description: 'Path to directory to generate Type files into.',
			type: 'string',
			demandOption: false,
		},
		s: {
			alias: 'specName',
			description:
				'A chain to generate types for. If this is not inputted it will create a types bundle for all chains.',
			type: 'string',
			demandOption: false,
		},
		a: {
			alias: 'availableChains',
			description: 'List all available chains to generate types for.',
			demandOption: false,
		},
	}).argv;
};
