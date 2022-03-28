import { FC } from 'react';
import './RadioButton.scss';
interface Props {
	id: string;
	onChange: (event: any) => void;
	value: string;
	selectedValue: string;
	label: string;
}

const RadioButton: FC<Props> = ({
	id,
	onChange,
	value,
	selectedValue,
	label,
}) => {
	return (
		<div className='radio-button'>
			<input
				type='radio'
				id={id}
				onChange={onChange}
				value={value}
				checked={selectedValue === value}
			/>
			<label htmlFor={id}>{label}</label>
		</div>
	);
};

export default RadioButton;
