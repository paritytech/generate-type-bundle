/// Copyright (C) 2022  Parity Technologies (UK) Ltd.
/// This file is part of generate-type-bundle.
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program.  If not, see <https://www.gnu.org/licenses/>.

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
