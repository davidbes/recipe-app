import { FC, InputHTMLAttributes } from 'react';
import './Inputs.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	title: string;
	name: string;
	error: string;
}

export interface InputState {
	val: string;
	err: string;
}

const Input: FC<Props> = ({ title, name, error, ...rest }: Props) => {
	return (
		<div className='input-wrapper'>
			<label htmlFor={name}>{title}</label>
			<input id={name} {...rest} />
			{error && <span>{error}</span>}
		</div>
	);
};

export default Input;
