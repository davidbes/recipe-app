import { FC } from 'react';
import { Icon, IconType } from 'components';
import './Snackbar.scss';

interface Props {
	message: string;
	type?: 'attention' | 'error' | 'info' | 'success';
	timer?: number;
}

const Snackbar: FC<Props> = ({ message, type = 'error' }: Props) => {
	const ICONTYPE = {
		attention: 'errorSign' as IconType,
		error: 'errorSign' as IconType,
		info: 'errorSign' as IconType,
		success: 'errorSign' as IconType,
	};

	return (
		<div className={`snackbar ${type}`}>
			<div className='icon-wrapper'>
				<Icon icon={ICONTYPE[type]} size={20} />
			</div>

			<div>{message}</div>
		</div>
	);
};

export default Snackbar;
