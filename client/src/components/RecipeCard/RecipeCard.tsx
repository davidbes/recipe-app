import { Icon } from 'components';
import { FC } from 'react';
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
		<div
			className='recipe-card'
			onClick={() => console.log('Go to Recipe', id)}
		>
			<div className='image'>
				<img src={image} alt='' />
				<button onClick={() => console.log('Open options')}>Options</button>
			</div>
			<div className='data'>
				<div className='text'>
					<h1>{name}</h1>
					<span>
						by <Link to={`/profile/${authorId}`}>{author}</Link>
					</span>
				</div>
				<div className='meta'>
					<div>
						{rating}
						<Icon icon='star' />
					</div>
					<div>
						{time}
						<Icon icon='timer' />
					</div>
					<div>
						{difficulty}
						<Icon icon='weight' />
					</div>
					<div>
						{servings}
						<Icon icon='serving' />
					</div>
				</div>
			</div>
		</div>
	);
};

export default RecipeCard;
