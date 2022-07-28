import { ArgumentParser, Namespace } from 'argparse';

export const parseArgs = (): Namespace => {
	const parser = new ArgumentParser();

	parser.add_argument('-v', '--version', { action: 'store_true' });
    // TODO add strict path check to make sure the path exists. 
    parser.add_argument('-p', '--path');
    parser.add_argument('-c', '--chain');
    parser.add_argument('-a', '--availableChains', { action: 'store_true' })

	return parser.parse_args() as Namespace;
};
