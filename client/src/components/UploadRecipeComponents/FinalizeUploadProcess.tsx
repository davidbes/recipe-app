import { Button } from 'components';
import { FormDataType } from 'components/Modals/UploadRecipeModal';
import { FC, useState } from 'react';

interface Props {
	onFinish: () => void;
	onChangeStep: (
		difficulty: number | null,
		duration: number | null,
		serves: number | null,
		stepChange: number
	) => void;
	currDifficulty: number | null;
	currServes: number | null;
	currDuration: number | null;
}

const FinalizeUploadProcess: FC<Props> = ({
	onChangeStep,
	onFinish,
	currDifficulty,
	currDuration,
	currServes,
}) => {
	const [difficulty, setDifficulty] = useState<number | null>(currDifficulty);
	const [duration, setDuration] = useState<number | null>(currDuration);
	const [serves, setServes] = useState<number | null>(currServes);

	return (
		<>
			<div className='form-content'>
				{currDifficulty}
				{currServes}
				{currDuration}
			</div>
			<div className='button-section'>
				<Button
					type='tertiary'
					variation='danger'
					onClick={() => onChangeStep(difficulty, duration, serves, -1)}
				>
					Previous
				</Button>
				<Button onClick={onFinish}>Finish</Button>
			</div>
		</>
	);
};

export default FinalizeUploadProcess;
