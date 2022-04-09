import { GroupedData } from 'components/InstructionsList/InstructionsList';
import { Instruction, ProcessGroup } from 'models/Recipe/Recipe.model';

const fillWithBlanks = (process: ProcessGroup[]): GroupedData[] => {
	const maxNumber = Math.max(
		...process.map((pr) => Math.max(...pr.instructions.map((it) => it.index)))
	);
	return process.map(({ instructions, ...rest }) => {
		const arr = new Array(maxNumber + 1).fill('blank');

		// Replace the blanks with elements where they actually exist.
		instructions.forEach((ins: Instruction) => {
			arr[ins.index] = ins;
		});
		return { ...rest, instructions: arr };
	});
};

export default fillWithBlanks;
