import { FC, useCallback, useEffect, useState } from 'react';
import {
	FilterBadgeSelect,
	FilterIngredientSelect,
	FilterRangeSelect,
	Pill,
	RecipesList,
	SearchBar,
	SortSelect,
} from 'components';
import { clearRecipes, fetchRecipes, openSnackbar } from 'features';
import { ScreenWrapper } from 'hoc';
import { useAppDispatch, useAppSelector } from 'hooks';
import './Discover.scss';
import { OrderType, SortByType } from 'components/FilterSelects/SortSelect';
import { Option } from 'components/SearchSelect/SearchSelect';

const Discover: FC = () => {
	const [query, setQuery] = useState<{
		ratingRng: string;
		difficultyRng: string;
		servesRng: string;
		timeRng: string;
		search: string;
		sort: SortByType;
		order: OrderType;
		badge: string[];
		ingredient: string[];
	}>({
		ratingRng: '',
		difficultyRng: '',
		servesRng: '',
		timeRng: '',
		search: '',
		sort: 'dateAdded',
		order: 'descending',
		badge: [],
		ingredient: [],
	});

	const [arrayQueryItems, setArrayQueryItems] = useState<
		{
			type: 'badge' | 'ingredient';
			name: string;
		}[]
	>([]);

	const dispatch = useAppDispatch();
	const { isLoading, recipes, error } = useAppSelector(
		(state) => state.recipesAll
	);

	useEffect(() => {
		// Apply filters here
		dispatch(fetchRecipes(query));
		return () => {
			dispatch(clearRecipes());
		};
	}, [dispatch, setQuery, query]);

	useEffect(() => {
		if (error && error.message) {
			dispatch(openSnackbar({ message: error.message, type: 'error' }));
		}
	}, [error]);

	const handleSearchSelect = useCallback(
		(type: 'badge' | 'ingredient', options: Option[]): void => {
			const strings = options.map((itm) => itm.value);
			if (type === 'badge') {
				const mergedArr = [...strings, ...query.badge];
				const uniqeArr = mergedArr.filter(function (item, pos, self) {
					return self.indexOf(item) == pos;
				});
				setQuery({
					...query,
					badge: uniqeArr,
				});
			} else {
				const mergedArr = [...strings, ...query.ingredient];
				const uniqeArr = mergedArr.filter(function (item, pos, self) {
					return self.indexOf(item) == pos;
				});
				setQuery({
					...query,
					ingredient: uniqeArr,
				});
			}

			const arrayQueryList: { type: 'badge' | 'ingredient'; name: string }[] =
				[];
			strings.forEach((str) => {
				if (
					!arrayQueryItems.find((obj) => obj.name === str && obj.type === type)
				) {
					arrayQueryList.push({ type: type, name: str });
				}
			});

			setArrayQueryItems([...arrayQueryItems, ...arrayQueryList]);
		},
		[query, setQuery]
	);

	const handleRemoveArrayQueryItem = useCallback(
		(type: 'badge' | 'ingredient', name: string) => {
			if (type === 'badge') {
				setQuery({
					...query,
					badge: query.badge.filter((itm) => itm !== name),
				});
			} else {
				setQuery({
					...query,
					ingredient: query.ingredient.filter((itm) => itm !== name),
				});
			}
			setArrayQueryItems(arrayQueryItems.filter((itm) => itm.name !== name));
		},
		[query, arrayQueryItems]
	);

	return (
		<ScreenWrapper>
			<div className='filter-section'>
				<SearchBar
					searchValue={(value) => setQuery({ ...query, search: value })}
				/>
				<div className='filters'>
					<FilterRangeSelect
						label={'Rating'}
						range={{
							minEdge: 0,
							maxEdge: 10,
						}}
						onApply={(min, max) =>
							setQuery({ ...query, ratingRng: `${min}:${max}` })
						}
						onReset={() => setQuery({ ...query, ratingRng: '' })}
					/>

					<FilterRangeSelect
						label={'Duration'}
						range={{
							minEdge: 0,
							maxEdge: 1000,
						}}
						onApply={(min, max) =>
							setQuery({ ...query, timeRng: `${min}:${max}` })
						}
						onReset={() => setQuery({ ...query, timeRng: '' })}
					/>
					<FilterRangeSelect
						label={'Difficulty'}
						range={{
							minEdge: 0,
							maxEdge: 10,
						}}
						onApply={(min, max) =>
							setQuery({ ...query, difficultyRng: `${min}:${max}` })
						}
						onReset={() => setQuery({ ...query, difficultyRng: '' })}
					/>
					<FilterRangeSelect
						label={'Servings'}
						range={{
							minEdge: 0,
							maxEdge: 50,
						}}
						onApply={(min, max) =>
							setQuery({ ...query, servesRng: `${min}:${max}` })
						}
						onReset={() => setQuery({ ...query, servesRng: '' })}
					/>
					<FilterBadgeSelect
						onApply={(options) => handleSearchSelect('badge', options)}
					/>
					<FilterIngredientSelect
						onApply={(options) => handleSearchSelect('ingredient', options)}
					/>
					<SortSelect
						order={query.order}
						sortBy={query.sort}
						onApply={(order: OrderType, sortBy: SortByType): void => {
							setQuery({ ...query, sort: sortBy, order: order });
						}}
					/>
				</div>
				<div className='applied-badges-ingredients'>
					{arrayQueryItems.map(({ type, name }, i) => (
						<Pill
							color={type === 'badge' ? 'green' : 'orange'}
							close={() => handleRemoveArrayQueryItem(type, name)}
							text={name}
						/>
					))}
				</div>
			</div>
			<div className='items'>
				<RecipesList recipes={recipes} isLoading={isLoading} />
			</div>
		</ScreenWrapper>
	);
};

export default Discover;
