import { FC } from 'react';
import { BsCheck } from 'react-icons/bs';
import './Checkbox.scss';

interface Props {
	id: string;
	checked: boolean;
	onChange: () => void;
	size?: 'default' | 'small';
}

const Checkbox: FC<Props> = ({ id, checked, onChange, children, size }) => {
	return (
		<div className={`checkbox-container ${size}`}>
			<input id={id} type='checkbox' checked={checked} onChange={onChange} />
			<label htmlFor={id}>
				<div className={`checkbox ${checked ? 'checked' : ''}`}>
					<BsCheck size={size == 'small' ? 12 : 18} />
				</div>
				<div className={`label-elements ${checked ? 'checked' : ''}`}>
					{children}
				</div>
			</label>
		</div>
	);
};

export default Checkbox;
