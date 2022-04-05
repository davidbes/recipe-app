import { Button, StepProgressBar } from 'components';
import AddImageAndTitle from 'components/UploadRecipeComponents/AddImageAndTitle';
import AddIngredients from 'components/UploadRecipeComponents/AddIngredients';
import AddInstructions from 'components/UploadRecipeComponents/AddInstructions';
import FinalizeUploadProcess from 'components/UploadRecipeComponents/FinalizeUploadProcess';
import { toggleModal } from 'features';
import { ModalWrapper } from 'hoc';
import { useAppDispatch } from 'hooks';
import { Ingredient, Instruction } from 'models/Recipe/Recipe.model';
import { FC, useCallback, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import './UploadRecipeModal.scss';

export interface FormDataType {
	title: string;
	image: File | null;
	imageSrc: string;
	ingredients: Ingredient[];
	instructions: Instruction[];
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

	const handleFinish = useCallback(() => {
		console.log(data);
	}, [data]);

	return (
		<ModalWrapper onClose={() => {}}>
			<div className='upload-modal'>
				<div className='heading-section'>
					<h3>Uplaod recipe</h3>
					<div>
						<Button
							type='tertiary'
							variation='neutral'
							onClick={() =>
								dispatch(
									toggleModal({ modal: 'uploadRecipeModal', toggleOpen: false })
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
							currInstructions={data.instructions}
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
		</ModalWrapper>
	);
};

export default UploadRecipeModal;
