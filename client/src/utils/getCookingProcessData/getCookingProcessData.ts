import {
	CookingProcessSection,
	CookingProcessItem,
} from 'components/Modals/CookingProcessModal';
import { ProcessGroup } from 'models/Recipe/Recipe.model';

const getCookingProcessData = (
	process: ProcessGroup[]
): CookingProcessSection[] => {
	const retProcess: CookingProcessSection[] = [];
	process.forEach(({ name, instructions }: ProcessGroup, i: number) => {
		const newInstructions: CookingProcessItem[] = [];
		instructions.forEach((instruction, j: number) => {
			if (j == 0 && instruction.index == j) {
				newInstructions[j] = {
					conditions: [],
					code: `${i}:${j}`,
					isDone: false,
					...instruction,
				};
			} else {
				const predecessorFromSection = process[i].instructions
					.slice()
					.reverse()
					.find((ins) => ins.index < instruction.index);

				const conditions: string[] = [];

				const immediatePredecessorFromSection =
					predecessorFromSection &&
					predecessorFromSection?.index + 1 == instruction.index;

				if (predecessorFromSection) {
					conditions.push(`${i}:${j - 1}`);
				}

				if (!immediatePredecessorFromSection) {
					process.forEach((sec, idx) => {
						if (idx != i) {
							const firstIndex = sec.instructions
								.slice()
								.reverse()
								.findIndex((ins) => {
									return ins.index < instruction.index;
								});
							if (firstIndex >= 0) {
								conditions.push(
									`${idx}:${sec.instructions.length - firstIndex - 1}`
								);
							}
						}
					});
				}
				newInstructions[j] = {
					conditions: conditions,
					code: `${i}:${j}`,
					...instruction,
					isDone: false,
				};
			}
		});
		retProcess[i] = { name: name, instructions: newInstructions };
	});
	return retProcess;
};

export default getCookingProcessData;
