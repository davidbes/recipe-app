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
	process: ProcessGroup[];
	userSaved: boolean | null;
}

export interface Badge {
	description: string;
	name: string;
}

export interface ProcessGroup {
	_id: string;
	name: string;
	instructions: Instruction[];
}

export interface Instruction {
	_id: string;
	index: number;
	instruction: string;
	warning: string;
}

export interface Ingredient {
	_id: string;
	amount: number;
	unit: string;
	name: string;
}
