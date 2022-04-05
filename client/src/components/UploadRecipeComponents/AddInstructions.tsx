import { Button } from 'components';
import { FormDataType } from 'components/Modals/UploadRecipeModal';
import { Instruction } from 'models/Recipe/Recipe.model';
import { FC, useCallback, useState } from 'react';

interface Props {
	onChangeStep: (instructions: Instruction[], stepChange: number) => void;
	currInstructions: Instruction[];
}

const AddInstructions: FC<Props> = ({ onChangeStep, currInstructions }) => {
	const [instructions, setInstructions] =
		useState<Instruction[]>(currInstructions);

	const handleNext = useCallback(() => {
		if (instructions.length > 0) {
			onChangeStep(instructions, +1);
		}
	}, [instructions]);

	return (
		<>
			<div className='form-content'>
				{currInstructions.map(({ instruction }) => (
					<div>{instruction}</div>
				))}
			</div>
			<div className='button-section'>
				<Button
					type='tertiary'
					variation='danger'
					onClick={() => onChangeStep(instructions, -1)}
				>
					Previous
				</Button>
				<Button onClick={handleNext}>Next</Button>
			</div>
		</>
	);
};

export default AddInstructions;
