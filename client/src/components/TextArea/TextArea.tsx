import { FC } from 'react';
import './TextArea.scss';

interface Props {
	onChange: (val: string) => void;
	label: string;
	value: string;
	placeholder: string;
	rows: number;
	cols: number;
}

const TextArea: FC<Props> = ({
	label,
	value,
	onChange,
	placeholder,
	rows,
	cols,
}: Props) => {
	return (
		<div className='text-area'>
			<span className='text-area-label'>{label}</span>
			<textarea
				placeholder={placeholder}
				onChange={(e) => onChange(e.target.value)}
				value={value}
				cols={cols}
				rows={rows}
			/>
		</div>
	);
};

export default TextArea;
