import { Button } from 'components';
import { FormDataType } from 'components/Modals/UploadRecipeModal';
import NumberInput from 'components/NumberInput/NumberInput';
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
				Recipe finalization
				<div className='number-inputs'>
					<NumberInput
						label='Difficulty'
						value={difficulty || 0}
						handleValue={(val: number) => setDifficulty(val)}
					/>
					<NumberInput
						label='Duration'
						max={400}
						value={duration || 0}
						handleValue={(val: number) => setDuration(val)}
					/>
					<NumberInput
						label='Serves'
						max={50}
						value={serves || 0}
						handleValue={(val: number) => setServes(val)}
					/>
				</div>
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
