import { Button, StepProgressBar } from 'components';
import CookingProcessStep from 'components/CookingProcessComponents/CookingProcessStep';
import GatherIngredientsStep from 'components/CookingProcessComponents/GatherIngredientsStep';
import RateProcessStep from 'components/CookingProcessComponents/RateProcessStep';
import {
	clearRateRecipe,
	fetchOneRecipe,
	rateRecipe,
	toggleModal,
} from 'features';
import { ModalWrapper, WithSpinner } from 'hoc';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Ingredient, Instruction } from 'models/Recipe/Recipe.model';
import { FC, useCallback, useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { getCookingProcessData } from 'utils';
import './CookingProcessModal.scss';

export interface GatheredIngredient {
	ingredient: Ingredient;
	checked: boolean;
}

export interface CookingProcessItem extends Instruction {
	code: string;
	conditions: string[];
	isDone: boolean;
}

export interface CookingProcessSection {
	name: string;
	instructions: CookingProcessItem[];
}

const CookingProcessModal: FC = () => {
	const [step, setStep] = useState<number>(1);
	const [processTime, setProcessTime] = useState<{
		start: Date | null;
		end: Date | null;
	}>({ start: null, end: null });
	const [ingredientsGathered, setIngredientsGathered] = useState<
		GatheredIngredient[]
	>([]);

	const [allIngredients, setAllIngredients] = useState<boolean>(false);
	const [processFinished, setProcessFinished] = useState<boolean>(false);
	const [process, setProcess] = useState<CookingProcessSection[]>([]); // need to think about this
	const [feedback, setFeedback] = useState<{
		rating: number;
		difficulty: number;
		serves: number;
		duration: number;
	}>({ rating: 0, difficulty: 0, serves: 0, duration: 0 });

	const dispatch = useAppDispatch();

	const { isLoading, recipe, error } = useAppSelector(
		(state) => state.recipeOne
	);

	useEffect(() => {
		if (recipe) {
			setIngredientsGathered(
				recipe?.ingredients.map((ingredient) => {
					return { ingredient: ingredient, checked: false };
				})
			);
			setProcess(getCookingProcessData(recipe.process));

			setFeedback({
				rating: recipe.rating,
				difficulty: recipe.difficulty,
				serves: recipe.serves,
				duration: recipe.time,
			});
		}
	}, [recipe]);

	const handleCheckIngredient = useCallback(
		(index: number): void => {
			setIngredientsGathered(
				ingredientsGathered.map((ing, i) => {
					if (i == index) {
						return { ...ing, checked: !ing.checked };
					}
					return ing;
				})
			);
		},

		[ingredientsGathered, allIngredients]
	);

	const handleMarkFinished = useCallback(
		(code: string): void => {
			setProcess(
				process.map((section) => {
					return {
						...section,
						instructions: section.instructions.map((instruction) => {
							return {
								...instruction,
								isDone: code == instruction.code ? true : instruction.isDone,
								conditions: instruction.conditions.filter(
									(str) => str !== code
								),
							};
						}),
					};
				})
			);
		},
		[process]
	);

	useEffect(() => {
		setProcessFinished(
			process.every((sec) => sec.instructions.every((item) => item.isDone))
		);
	}, [process]);

	useEffect(() => {
		if (processFinished) {
			setProcessTime({ ...processTime, end: new Date() });
		}
	}, [processFinished]);

	useEffect(() => {
		if (ingredientsGathered.length > 0) {
			setAllIngredients(
				ingredientsGathered.every((ing) => {
					return ing.checked;
				})
			);
		}
	}, [ingredientsGathered]);

	const handleCheckAll = useCallback(() => {
		setIngredientsGathered(
			ingredientsGathered.map((ing) => ({ ...ing, checked: !allIngredients }))
		);
	}, [ingredientsGathered, allIngredients]);

	const handleFinish = useCallback(
		(rating: number, duration: number, difficulty: number, serves: number) => {
			if (recipe) {
				dispatch(
					rateRecipe({
						id: recipe.id,
						rating: rating,
						duration: duration,
						difficulty: difficulty,
						serves: serves,
					})
				);
			}
		},
		[step, recipe]
	);

	const { isLoading: rateLoading, isSucess: ratingSuccessful } = useAppSelector(
		(state) => state.rateRecipe
	);

	useEffect(() => {
		if (!rateLoading && ratingSuccessful) {
			dispatch(
				toggleModal({
					modal: 'cookingProcessModal',
					toggleOpen: false,
				})
			);
		}

		return () => {
			dispatch(clearRateRecipe());
			dispatch(fetchOneRecipe(recipe?.id || ''));
		};
	}, [rateLoading, ratingSuccessful]);

	return (
		<ModalWrapper onClose={() => {}}>
			<WithSpinner isLoading={isLoading || rateLoading}>
				{recipe && (
					<div className='cooking-process-modal'>
						<div className='heading-section'>
							<h3>Cooking: {recipe.name}</h3>
							<div>
								<Button
									type='tertiary'
									variation='neutral'
									onClick={() =>
										dispatch(
											toggleModal({
												modal: 'cookingProcessModal',
												toggleOpen: false,
											})
										)
									}
									iconOnly
								>
									<IoClose size={24} />
								</Button>
							</div>
						</div>
						<StepProgressBar
							steps={['Ingredients', 'Instructions', 'Feedback']}
							currentlyActive={step}
						/>
						{
							[
								<GatherIngredientsStep
									canGoForward={allIngredients}
									ingredients={ingredientsGathered}
									onIngredientCheck={handleCheckIngredient}
									onChangeStep={(newStep: number): void => {
										if (processTime.start == null) {
											setProcessTime({ start: new Date(), end: null });
										}
										setStep(step + newStep);
									}}
									onCheckAll={handleCheckAll}
								/>,
								<CookingProcessStep
									processFinished={processFinished}
									onMarkFinished={handleMarkFinished}
									process={process}
									onChangeStep={(newStep: number): void => {
										setStep(step + newStep);
									}}
								/>,
								<RateProcessStep
									processTime={
										processTime.start && processTime.end
											? { start: processTime.start, end: processTime.end }
											: { start: new Date(), end: new Date() }
									}
									defaultFeedback={feedback}
									onFinish={handleFinish}
								/>,
							][step - 1]
						}
					</div>
				)}
			</WithSpinner>
		</ModalWrapper>
	);
};

export default CookingProcessModal;
