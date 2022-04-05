import { Instruction } from 'models/Recipe/Recipe.model';

const generateLayout = (
	sections: { name: string; code: string }[],
	instructions: Instruction[]
) => {
	let max = +instructions[0].code.slice(1);
	instructions.forEach(({ code }) => {
		max = Math.max(max, +code.slice(1));
	});

	const objectVals: { [key: string]: string } = {};
	sections.forEach((element) => {
		objectVals[element.code] = '';
	});

	const returnArr = [];
	for (let i = 0; i < max; i++) {
		const obj: { [key: string]: string } = {};
		instructions.forEach(({ code, instruction }) => {
			const char = code.charAt(0);
			const idx = +code.slice(1) - 1;
			if (i === idx) {
				obj[char] = instruction;
			}
		});
		returnArr.push(obj);
	}

	return returnArr;
};

export default generateLayout;
