import { FC, useEffect } from 'react';
import { Icon, IconType } from 'components';
import './Snackbar.scss';
import { useAppDispatch } from 'hooks';
import { closeSnackbar } from 'features';

interface Props {
	message: string;
	type?: 'attention' | 'error' | 'info' | 'success';
	timer?: number;
	isActive: boolean;
}

const Snackbar: FC<Props> = ({ message, type = 'error', isActive }: Props) => {
	const ICONTYPE = {
		attention: 'warningSign' as IconType,
		error: 'errorSign' as IconType,
		info: 'info' as IconType,
		success: 'successSign' as IconType,
	};

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (isActive) {
			setTimeout(() => {
				dispatch(closeSnackbar());
			}, 3000);
		}
	}, [isActive]);

	return (
		<div
			className={`snackbar ${type} ${isActive ? 'fade-in' : 'fade-out'}`}
			onClick={() => dispatch(closeSnackbar())}
		>
			<div className='icon-wrapper'>
				<Icon icon={ICONTYPE[type]} size={24} />
			</div>

			<div>{message}</div>
		</div>
	);
};

export default Snackbar;
