export interface Recipe {
	id: string;
	name: string;
	author: string;
	image: string;
	langugae: string;
	badges: Badge[];
	averages: {
		rating: number;
		time: number;
		difficulty: number;
		serves: number;
	};
}

export interface Badge {
	description: string;
	name: string;
}
