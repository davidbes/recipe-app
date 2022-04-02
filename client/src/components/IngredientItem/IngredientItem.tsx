import { FC } from 'react';
import './IngredientItem.scss';

interface Props {
	name: string;
	amount: number;
	unit: string;
}

const IngredientItem: FC<Props> = ({ name, amount, unit }) => {
	return (
		<div className='ingredient-item'>
			<div className='ingredient-label'>{name}</div>
			<div className='ingredient-amount'>
				{amount} {unit}
			</div>
		</div>
	);
};

export default IngredientItem;
