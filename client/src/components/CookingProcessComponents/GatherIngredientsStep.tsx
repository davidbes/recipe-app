import { FC } from 'react';
import { Button, Checkbox } from 'components';
import { GatheredIngredient } from 'components/Modals/CookingProcessModal';
import './CookingProcessComponents.scss';

interface Props {
	onChangeStep: (stepChange: number) => void;
	onIngredientCheck: (index: number) => void;
	onCheckAll: () => void;
	ingredients: GatheredIngredient[];
	canGoForward: boolean;
}

const GatherIngredientsStep: FC<Props> = ({
	onChangeStep,
	onIngredientCheck,
	onCheckAll,
	ingredients,
	canGoForward,
}) => {
	return (
		<>
			<div className='cooking-process-content'>
				Gather all the ingredients
				<div className='checkbox-items'>
					{ingredients.map(
						({ ingredient, checked }: GatheredIngredient, index: number) => {
							return (
								<Checkbox
									key={index}
									id={'checkbox-' + ingredient._id}
									onChange={() => onIngredientCheck(index)}
									checked={checked}
								>
									<div className='checkbox-ingredient-item'>
										<span className='checkbox-ingredient-name'>
											{ingredient.name}
										</span>
										<div className='checkbox-ingredient-amount'>
											{ingredient.amount} {ingredient.unit}
										</div>
									</div>
								</Checkbox>
							);
						}
					)}
				</div>
				<span className='check-all' onClick={() => onCheckAll()}>
					Check all
				</span>
			</div>

			<div className='button-section'>
				<Button disabled={!canGoForward} onClick={() => onChangeStep(+1)}>
					Start cooking
				</Button>
			</div>
		</>
	);
};

export default GatherIngredientsStep;
