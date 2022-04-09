import { Button } from 'components';
import { FC } from 'react';
import './CookingProcessComponents.scss';

interface Props {
	onChangeStep: (stepChange: number) => void;
}

const CookingProcessStep: FC<Props> = ({ onChangeStep }) => {
	return (
		<>
			<div className='cooking-process-content'></div>

			<div className='button-section'>
				<Button onClick={() => onChangeStep(+1)}>Finish Cooking</Button>
			</div>
		</>
	);
};

export default CookingProcessStep;
