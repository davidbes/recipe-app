import { FC, ReactElement } from 'react';
import { RecipeListItem } from 'models';
import { RecipeCard } from 'components';
import { WithSpinner } from 'hoc';

interface Props {
	recipes: RecipeListItem[];
	isLoading: boolean;
}

const RecipesList: FC<Props> = ({
	recipes,
	isLoading,
}: Props): ReactElement => {
	return (
		<WithSpinner isLoading={isLoading}>
			{recipes.length > 0 ? (
				<div className='items'>
					{recipes.map((item: RecipeListItem) => (
						<RecipeCard
							key={item.id}
							id={item.id}
							image={item.image}
							name={item.name}
							author={item.authorName}
							authorId={item.authorId}
							rating={item.rating}
							time={item.time}
							difficulty={item.serves}
							servings={item.difficulty}
						/>
					))}
				</div>
			) : (
				<div className='center-container'>No data found</div>
			)}
		</WithSpinner>
	);
};

export default RecipesList;
