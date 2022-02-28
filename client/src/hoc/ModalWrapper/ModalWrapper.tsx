import { FC, ReactNode } from 'react';
import './ModalWrapper.scss';

interface Props {
	onClose: () => void;
	children: ReactNode;
}

const ModalWrapper: FC<Props> = ({ onClose, children }: Props) => {
	return (
		<>
			<div className='modal-backdrop' onClick={onClose} />
			<div className='modal-wrapper'>{children}</div>
		</>
	);
};

export default ModalWrapper;
