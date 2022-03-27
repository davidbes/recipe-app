import { useImageUrl } from 'hooks';
import { FC, useMemo } from 'react';
import { getInitials } from 'utils';
import './ProfileImage.scss';

interface Props {
	img?: string;
	name: string;
}

const ProfileImage: FC<Props> = ({ img, name }: Props) => {
	const imageUrl = useImageUrl(img || '');

	return img ? (
		<img className='profile-image' src={imageUrl} alt='Display image' />
	) : (
		<div className='no-img-avatar'>{getInitials(name)}</div>
	);
};

export default ProfileImage;
