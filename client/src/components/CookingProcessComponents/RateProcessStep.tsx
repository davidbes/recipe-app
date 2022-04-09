import { Button } from 'components';
import { FC } from 'react';
import './CookingProcessComponents.scss';

interface Props {
	onFinish: () => void;
}

const RateProcessStep: FC<Props> = ({ onFinish }) => {
	return (
		<>
			<div className='cooking-process-content'></div>

			<div className='button-section'>
				<Button onClick={() => onFinish()}>Done</Button>
			</div>
		</>
	);
};

export default RateProcessStep;
