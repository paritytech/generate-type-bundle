import yargs from 'yargs';

export interface ArgsType {
	[x: string]: unknown;
	v: number | undefined;
	p: string;
	s: string | undefined;
	a: unknown;
	_: (string | number)[];
	$0: string;
}

export const argv = (): ArgsType => {
	return yargs.version(false).options({
		v: {
			alias: 'version',
			description: 'Version of the current package.',
			type: 'number',
			demandOption: false,
		},
		p: {
			alias: 'path',
			description: 'Path to directory to generate Type files into.',
			type: 'string',
			demandOption: true,
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
