import { FC } from 'react';
import './Button.scss';

interface Props {
	onClick: () => void;
	type?: 'primary' | 'secondary' | 'tertiary';
	variation?: 'info' | 'attention' | 'danger' | 'neutral';
	size?: 'default' | 'small';
	disabled?: boolean;
	iconOnly?: boolean;
}

const Button: FC<Props> = ({
	onClick,
	type = 'primary',
	disabled = false,
	variation = 'info',
	size = 'default',
	children,
	iconOnly,
}) => (
	<button
		className={`${type} ${variation} ${size} ${iconOnly ? 'icon' : ''}`}
		disabled={disabled}
		onClick={onClick}
	>
		{children}
	</button>
);

export default Button;
