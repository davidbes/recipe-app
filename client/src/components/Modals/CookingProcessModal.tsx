import { Button, StepProgressBar } from 'components';
import CookingProcessStep from 'components/CookingProcessComponents/CookingProcessStep';
import GatherIngredientsStep from 'components/CookingProcessComponents/GatherIngredientsStep';
import RateProcessStep from 'components/CookingProcessComponents/RateProcessStep';
import { toggleModal } from 'features';
import { ModalWrapper, WithSpinner } from 'hoc';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Ingredient } from 'models/Recipe/Recipe.model';
import { FC, useCallback, useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import './CookingProcessModal.scss';

export interface GatheredIngredient {
	ingredient: Ingredient;
	checked: boolean;
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
	const [instructionsDone, setInstructionsDone] = useState<any[]>([]); // need to think about this
	const [feedback, setFeedback] = useState<{
		rating: number;
		difficulty: number;
		serves: number;
	}>({ rating: 0, difficulty: 0, serves: 0 });

	const dispatch = useAppDispatch();

	const { isLoading, recipe, error } = useAppSelector(
		(state) => state.recipeOne
	);

	const handleFinish = useCallback(() => {
		dispatch(
			toggleModal({
				modal: 'cookingProcessModal',
				toggleOpen: false,
			})
		);
	}, [step, recipe]);

	return (
		<ModalWrapper onClose={() => {}}>
			<WithSpinner isLoading={isLoading}>
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
									onChangeStep={(newStep: number) => {
										setStep(step + newStep);
									}}
								/>,
								<CookingProcessStep
									onChangeStep={(newStep: number) => {
										setStep(step + newStep);
									}}
								/>,
								<RateProcessStep onFinish={handleFinish} />,
							][step - 1]
						}
					</div>
				)}
			</WithSpinner>
		</ModalWrapper>
	);
};

export default CookingProcessModal;
