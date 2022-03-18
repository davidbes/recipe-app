import { FC, ReactNode, useState } from 'react';
import './WithTooltip.scss';

interface Props {
	children: ReactNode;
	content: ReactNode | string;
	delay?: number;
	direction?: 'top' | 'bottom' | 'right' | 'left';
}

const WithTooltip: FC<Props> = ({
	children,
	content,
	delay = 200,
	direction = 'top',
}: Props) => {
	let timeout: NodeJS.Timeout;
	const [active, setActive] = useState(false);

	const showTip = () => {
		timeout = setTimeout(() => {
			setActive(true);
		}, delay);
	};

	const hideTip = () => {
		clearInterval(timeout);
		setActive(false);
	};
	return (
		<div
			className='tooltip-wrapper'
			onMouseEnter={showTip}
			onMouseLeave={hideTip}
		>
			{children}
			{active && <div className={`tooltip ${direction}`}>{content}</div>}
		</div>
	);
};

export default WithTooltip;
