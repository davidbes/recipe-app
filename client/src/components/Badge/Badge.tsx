import { FC } from 'react';
import { WithTooltip } from 'hoc';
import './Badge.scss';

interface Props {
	name: string;
	description: string;
}

const Badge: FC<Props> = ({ name, description }: Props) => {
	return (
		<WithTooltip content={description}>
			<img
				className='badge'
				src={
					process.env.REACT_APP_SERVER_URL + '/images/badges/' + name + '.png'
				}
				alt='Badge'
			/>
		</WithTooltip>
	);
};

export default Badge;
