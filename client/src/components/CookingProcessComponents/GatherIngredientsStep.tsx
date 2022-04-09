import Button from 'components/Button/Button';
import { FC } from 'react';
import './CookingProcessComponents.scss';

interface Props {
	onChangeStep: (stepChange: number) => void;
}

const GatherIngredientsStep: FC<Props> = ({ onChangeStep }) => {
	return (
		<>
			<div className='cooking-process-content'></div>

			<div className='button-section'>
				<Button onClick={() => onChangeStep(+1)}>Start cooking</Button>
			</div>
		</>
	);
};

export default GatherIngredientsStep;
