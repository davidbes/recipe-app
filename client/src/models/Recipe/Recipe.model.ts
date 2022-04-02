export interface Recipe {
	id: string;
	name: string;
	author: {
		id: string;
		name: string;
	};
	image: string;
	langugae: string;
	badges: Badge[];
	rating: number;
	time: number;
	difficulty: number;
	serves: number;
	ingredients: Ingredient[];
	instructionSections: {
		_id: string;
		code: string;
		name: string;
	}[];
	instructions: Instruction[];
}

export interface Badge {
	description: string;
	name: string;
}

export interface Instruction {
	_id: string;
	instruction: string;
	code: string;
	condition: string[];
	warning: string;
}

export interface Ingredient {
	_id: string;
	amount: number;
	unit: string;
	name: string;
}
