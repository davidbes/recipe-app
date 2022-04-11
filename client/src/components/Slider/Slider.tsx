import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import './Slider.scss';

interface Props {
	min: number;
	max: number;
	onChange: (value: number) => void;
	currValue: number;
}

const Slider: FC<Props> = ({ max, min, currValue, onChange }) => {
	const [val, setVal] = useState(currValue);
	const valueRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		onChange(val);
	}, [val, val, onChange]);
	return (
		<div className='slider-container'>
			<div className='edge-number'>{min}</div>
			<input
				type='range'
				min={min}
				max={max}
				value={val}
				ref={valueRef}
				onChange={(event: ChangeEvent<HTMLInputElement>) => {
					setVal(+event.target.value);
				}}
			/>
			<div className='edge-number'>{max}</div>
		</div>
	);
};

export default Slider;
