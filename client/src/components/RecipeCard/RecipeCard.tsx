import { Icon } from 'components';
import IconDropdownButton from 'components/IconDropdownButton/IconDropdownButton';
import { WithTooltip } from 'hoc';
import { useImageUrl } from 'hooks';
import { FC } from 'react';
import { GoKebabVertical } from 'react-icons/go';
import { Link } from 'react-router-dom';
import './RecipeCard.scss';

interface Props {
	id: string;
	image: string;
	name: string;
	author: string;
	rating: number;
	time: number;
	difficulty: number;
	servings: number;
	authorId: string;
}

const RecipeCard: FC<Props> = ({
	id,
	image,
	name,
	author,
	rating,
	time,
	difficulty,
	servings,
	authorId,
}: Props) => {
	return (
		<div className='recipe-card-wrapper'>
			<Link className='recipe-card' to={`/recipe/${id}`}>
				<div className='image'>
					<img src={useImageUrl(image)} alt='Recipe' />
				</div>
				<div className='data'>
					<div className='text'>
						<h1>{name}</h1>
						<span>
							by{' '}
							<Link className='clickable-content' to={`/profile/${authorId}`}>
								{author}
							</Link>
						</span>
					</div>
					<div className='meta'>
						<div className='meta-item'>
							<WithTooltip content={'Rating'}>
								<div className='item-content yellow'>
									{rating || 0}
									<Icon icon='star' />
								</div>
							</WithTooltip>
						</div>
						<div className='meta-item'>
							<WithTooltip content={'Time Required'}>
								<div className='item-content green'>
									{time || 0}
									<Icon icon='timer' />
								</div>
							</WithTooltip>
						</div>
						<div className='meta-item'>
							<WithTooltip content={'Difficulty'}>
								<div className='item-content blue'>
									{difficulty || 0}
									<Icon icon='weight' />
								</div>
							</WithTooltip>
						</div>

						<div className='meta-item'>
							<WithTooltip content={'Serves'}>
								<div className='item-content red'>
									{servings || 0}
									<Icon icon='serving' />
								</div>
							</WithTooltip>
						</div>
					</div>
				</div>
			</Link>
			<div className='action-button'>
				<IconDropdownButton
					theme='light'
					options={[
						{
							label: 'Save',
							action: () => alert('loggie'),
						},
						{
							label: 'Delete',
							action: () => alert('loggie'),
							type: 'danger',
						},
					]}
				>
					<GoKebabVertical />
				</IconDropdownButton>
			</div>
		</div>
	);
};

export default RecipeCard;
