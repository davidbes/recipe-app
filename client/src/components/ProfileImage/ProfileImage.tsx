import { FC } from 'react';
import { getInitials } from 'utils';
import './ProfileImage.scss';

interface Props {
	img?: string;
	name: string;
}

const ProfileImage: FC<Props> = ({ img, name }: Props) => {
	return img ? (
		<img className='profile-image' src={img} alt='Display image' />
	) : (
		<div className='no-img-avatar'>{getInitials(name)}</div>
	);
};

export default ProfileImage;
