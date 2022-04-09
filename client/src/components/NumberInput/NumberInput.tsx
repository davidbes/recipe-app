import { FC, useCallback } from 'react';
import { IoAdd, IoRemove } from 'react-icons/io5';
import { Button } from 'components';
import './NumberInput.scss';

interface Props {
	label: string;
	handleValue: (value: number) => void;
	value: number;
	min?: number;
	max?: number;
}

const NumberInput: FC<Props> = ({
	label,
	handleValue,
	value,
	min = 0,
	max = 10,
}: Props) => {
	const handleButtonClick = useCallback(
		(val: number) => {
			const newVal = val + value;
			if (min <= newVal && newVal <= max) {
				handleValue(newVal);
			}
		},
		[value, handleValue]
	);

	return (
		<div className='number-input-wrapper'>
			<div className='number-input-label'>{label}</div>
			<div className='number-input-with-buttons'>
				<Button size='small' iconOnly onClick={() => handleButtonClick(-1)}>
					<IoRemove size={14} />
				</Button>
				<input
					min={min}
					max={max}
					type='number'
					onChange={(e) => handleValue(+e.target.value)}
					value={value}
				/>
				<Button size='small' iconOnly onClick={() => handleButtonClick(+1)}>
					<IoAdd size={14} />
				</Button>
			</div>
		</div>
	);
};

export default NumberInput;
