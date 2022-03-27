import { FC, ReactNode, useRef, useState } from 'react';
import { useClickOutisde } from 'hooks';
import './IconDropdownButton.scss';

interface OptionType {
	label: string;
	action: () => void;
	type?: 'default' | 'danger';
}

interface Props {
	options: OptionType[];
	children: ReactNode;
	theme?: 'dark' | 'light';
}

const IconDropdownButton: FC<Props> = ({
	options,
	children,
	theme = 'dark',
}: Props) => {
	const [open, setOpen] = useState<boolean>(false);
	const ref = useRef<HTMLDivElement>(null);

	useClickOutisde(ref, () => {
		setOpen(false);
	});

	return (
		<div
			ref={ref}
			className={`dropdown-button ${open ? 'active' : ''} ${theme}`}
		>
			<button onClick={() => setOpen(!open)}>{children}</button>
			{open && (
				<div className='options'>
					{options.map(({ label, action, type = 'default' }) => {
						return (
							<div className={`option ${type}`} onClick={() => action()}>
								{label}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default IconDropdownButton;
