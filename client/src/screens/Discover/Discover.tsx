import { FC, useEffect, useState } from 'react';
import {
	FilterBadgeSelect,
	FilterRangeSelect,
	RecipesList,
	SearchBar,
	SortSelect,
} from 'components';
import { clearRecipes, fetchRecipes, openSnackbar } from 'features';
import { ScreenWrapper } from 'hoc';
import { useAppDispatch, useAppSelector } from 'hooks';
import './Discover.scss';
import { OrderType, SortByType } from 'components/FilterSelects/SortSelect';

const Discover: FC = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	// const [values, setValues] = useState<any>({
	// 	min: 0,
	// 	max: 100,
	// });
	const dispatch = useAppDispatch();
	const { isLoading, recipes, error } = useAppSelector(
		(state) => state.recipesAll
	);

	useEffect(() => {
		// Apply filters here
		dispatch(fetchRecipes());
		return () => {
			dispatch(clearRecipes());
		};
	}, [dispatch, searchValue, setSearchValue]);

	useEffect(() => {
		if (error && error.message) {
			dispatch(openSnackbar({ message: error.message, type: 'error' }));
		}
	}, [error]);

	return (
		<ScreenWrapper>
			<div className='filter-section'>
				<SearchBar searchValue={(value) => setSearchValue(value)} />
				<div className='filters'>
					<FilterRangeSelect
						label={'Rating'}
						range={{
							minEdge: 0,
							maxEdge: 10,
						}}
						onApply={(min, max) =>
							console.log('Applying to', 'Rating', min, max)
						}
						onReset={() => console.log('Clear Filter')}
					/>

					<FilterRangeSelect
						label={'Duration'}
						range={{
							minEdge: 0,
							maxEdge: 1000,
						}}
						onApply={(min, max) =>
							console.log('Applying to', 'Rating', min, max)
						}
						onReset={() => console.log('Clear Filter')}
					/>
					<FilterRangeSelect
						label={'Difficulty'}
						range={{
							minEdge: 0,
							maxEdge: 10,
						}}
						onApply={(min, max) =>
							console.log('Applying to', 'Rating', min, max)
						}
						onReset={() => console.log('Clear Filter')}
					/>
					<FilterRangeSelect
						label={'Servings'}
						range={{
							minEdge: 0,
							maxEdge: 50,
						}}
						onApply={(min, max) =>
							console.log('Applying to', 'Rating', min, max)
						}
						onReset={() => console.log('Clear Filter')}
					/>

					<FilterBadgeSelect />

					<SortSelect
						order='ascending'
						sortBy='dateAdded'
						onApply={(order: OrderType, sortBy: SortByType): void => {
							console.log('Hello');
						}}
					/>
				</div>
			</div>
			<div className='items'>
				<RecipesList recipes={recipes} isLoading={isLoading} />
			</div>
		</ScreenWrapper>
	);
};

export default Discover;
