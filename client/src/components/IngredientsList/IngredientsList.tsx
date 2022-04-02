import { IngredientItem } from 'components';
import { Ingredient } from 'models/Recipe/Recipe.model';
import { FC } from 'react';
import './IngredientsList.scss';

interface Props {
	ingredients: Ingredient[];
}

const IngredientsList: FC<Props> = ({ ingredients }) => {
	return (
		<div className='ingredients-list-wrapper'>
			<div className='ingredients-header'>
				<h3>Ingredients</h3>
				<span>{ingredients.length >= 0 && ingredients.length + ' items'}</span>
			</div>
			<div className='ingredients-list'>
				{ingredients.map(({ name, amount, unit, _id }) => (
					<IngredientItem key={_id} name={name} amount={amount} unit={unit} />
				))}
			</div>
		</div>
	);
};

export default IngredientsList;
