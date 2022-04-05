import { Button } from 'components';
import { Ingredient } from 'models/Recipe/Recipe.model';
import { FC, useCallback, useState } from 'react';

interface Props {
	onChangeStep: (ingredients: Ingredient[], stepChange: number) => void;
	currIngredients: Ingredient[];
}

const AddIngredients: FC<Props> = ({ onChangeStep, currIngredients }) => {
	const [ingredients, setIngredients] = useState<Ingredient[]>(currIngredients);

	const handleNext = useCallback(() => {
		if (ingredients.length > 0) {
			onChangeStep(ingredients, +1);
		}
	}, [ingredients]);

	return (
		<>
			<div className='form-content'></div>
			<div className='button-section'>
				<Button
					type='tertiary'
					variation='danger'
					onClick={() => onChangeStep(ingredients, -1)}
				>
					Previous
				</Button>
				<Button onClick={handleNext}>Next</Button>
			</div>
		</>
	);
};

export default AddIngredients;
