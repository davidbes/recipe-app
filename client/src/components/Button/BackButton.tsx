import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import Button from './Button';

const BackButton: FC = () => {
	const navigate = useNavigate();

	return (
		<Button
			type='tertiary'
			variation='neutral'
			onClick={() => navigate(-1)}
			iconOnly
		>
			<IoIosArrowBack size={20} />
		</Button>
	);
};

export default BackButton;
