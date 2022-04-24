import { Button, StepProgressBar } from 'components';
import AddImageAndTitle from 'components/UploadRecipeComponents/AddImageAndTitle';
import AddIngredients from 'components/UploadRecipeComponents/AddIngredients';
import AddInstructions, {
	Section,
} from 'components/UploadRecipeComponents/AddInstructions';
import FinalizeUploadProcess from 'components/UploadRecipeComponents/FinalizeUploadProcess';
import {
	clearUploadRecipeData,
	fetchUploadedRecipes,
	openSnackbar,
	toggleModal,
	uploadRecipe,
} from 'features';
import { ModalWrapper, WithSpinner } from 'hoc';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Ingredient } from 'models/Recipe/Recipe.model';
import { FC, useCallback, useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import './UploadRecipeModal.scss';

export interface FormDataType {
	title: string;
	image: File | null;
	imageSrc: string;
	ingredients: Ingredient[];
	instructions: Section[];
	duration: number | null;
	difficulty: number | null;
	serves: number | null;
}
const defaultData: FormDataType = {
	title: '',
	image: null,
	imageSrc: '',
	ingredients: [],
	instructions: [],
	duration: null,
	difficulty: null,
	serves: null,
};

const UploadRecipeModal: FC = () => {
	const [step, setStep] = useState<number>(1);
	const [data, setData] = useState<FormDataType>(defaultData);

	const dispatch = useAppDispatch();

	const handleFinish = useCallback(
		(difficulty, duration, serves) => {
			const instructions = data.instructions.map((section: Section) => {
				return {
					...section,
					instructions: section.instructions
						.map((ins, i: number) => {
							return ins !== 'blank'
								? {
										...ins,
										index: i,
								  }
								: ins;
						})
						.filter((val) => val !== 'blank'),
				};
			});

			const formData = new FormData();
			formData.append('image', data.image as File);
			formData.append('name', data.title);
			formData.append('instructions', JSON.stringify(instructions));
			formData.append(
				'ingredients',
				JSON.stringify(data.ingredients.map(({ _id, ...rest }) => rest))
			);

			console.log(data);
			formData.append('serves', serves.toString() || '0');
			formData.append('duration', duration.toString() || '0');
			formData.append('difficulty', difficulty.toString() || '0');
			dispatch(uploadRecipe(formData));
		},
		[data]
	);

	const { isLoading, isSuccess, recipeId } = useAppSelector(
		(state) => state.uploadRecipe
	);

	const { userId } = useAppSelector((state) => state.auth);

	const navigate = useNavigate();
	useEffect(() => {
		if (isSuccess && recipeId) {
			dispatch(toggleModal({ modal: 'uploadRecipeModal', toggleOpen: false }));
			dispatch(
				openSnackbar({
					type: 'success',
					message: 'Recipe succesfully uploaded!',
				})
			);
			dispatch(fetchUploadedRecipes(userId));
			navigate('/recipe/' + recipeId);
			return () => {
				dispatch(clearUploadRecipeData());
			};
		}
	}, [isSuccess, recipeId]);

	return (
		<ModalWrapper onClose={() => {}}>
			<WithSpinner isLoading={isLoading}>
				<div className='upload-modal'>
					<div className='heading-section'>
						<h3>Upload recipe</h3>
						<div>
							<Button
								type='tertiary'
								variation='neutral'
								onClick={() =>
									dispatch(
										toggleModal({
											modal: 'uploadRecipeModal',
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
						steps={['Initialize', 'Ingredients', 'Instructions', 'Finalize']}
						currentlyActive={step}
					/>

					{
						[
							<AddImageAndTitle
								currImage={data.image}
								currImageSrc={data.imageSrc}
								currTitle={data.title}
								onChangeStep={(title, file, imgSrc, stepChange) => {
									setData({
										...data,
										image: file,
										title: title,
										imageSrc: imgSrc,
									});
									setStep(step + stepChange);
								}}
							/>,
							<AddIngredients
								currIngredients={data.ingredients}
								onChangeStep={(ingredients, stepChange) => {
									setData({
										...data,
										ingredients: ingredients,
									});
									setStep(step + stepChange);
								}}
							/>,
							<AddInstructions
								currSections={data.instructions}
								onChangeStep={(instructions, stepChange) => {
									setData({
										...data,
										instructions: instructions,
									});
									setStep(step + stepChange);
								}}
							/>,
							<FinalizeUploadProcess
								currDifficulty={data.difficulty}
								currDuration={data.duration}
								currServes={data.serves}
								onChangeStep={(difficulty, duration, serves, stepChange) => {
									setData({
										...data,
										difficulty: difficulty,
										duration: duration,
										serves: serves,
									});
									setStep(step + stepChange);
								}}
								onFinish={handleFinish}
							/>,
						][step - 1]
					}
				</div>
			</WithSpinner>
		</ModalWrapper>
	);
};

export default UploadRecipeModal;
