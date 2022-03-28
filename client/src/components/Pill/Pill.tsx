import { FC } from 'react';
import { IoClose } from 'react-icons/io5';

import './Pill.scss';

export type PillColor =
	| 'green'
	| 'red'
	| 'yellow'
	| 'blue'
	| 'light-green'
	| 'orange';

interface Props {
	color: PillColor;
	close: () => void;
	text: string;
}

const Pill: FC<Props> = ({ close, text, color }: Props) => {
	return (
		<div className={`pill ${color}`} onClick={close}>
			{text}
			<IoClose />
		</div>
	);
};

export default Pill;
