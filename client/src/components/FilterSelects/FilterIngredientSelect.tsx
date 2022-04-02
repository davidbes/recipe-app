import { FC, useState, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector, useClickOutisde } from 'hooks';
import './FilterSelects.scss';
import { Button } from 'components';
import SearchSelect from 'components/SearchSelect/SearchSelect';
import { fetchIngredients, clearIngredients } from 'features';
import { Option } from '../SearchSelect/SearchSelect';

interface Props {
	onApply: (badges: Option[]) => void;
}

const FilterIngredientSelect: FC<Props> = ({ onApply }: Props) => {
	const [open, setOpen] = useState(false);

	const [selected, setSelected] = useState<Option[]>([]);

	const dispatch = useAppDispatch();

	const ref = useRef<HTMLDivElement>(null);

	useClickOutisde(ref, () => {
		setSelected([]);
		setOpen(false);
	});

	const { isLoading, ingredients, error } = useAppSelector(
		(state) => state.ingredientsSearch
	);

	const searchIngredients = useCallback((value) => {
		dispatch(fetchIngredients(value));
	}, []);

	const handleRemoveOption = useCallback(
		(id) => {
			setSelected(selected.filter((item) => item.id !== id));
		},
		[selected, setSelected]
	);

	const handleAddOption = useCallback(
		(option) => {
			setSelected([...selected, option]);
			dispatch(clearIngredients());
		},
		[selected, setSelected]
	);

	return (
		<div className='filter-select-wrapper' ref={ref}>
			<button
				className={`filter-select-button ${open ? 'open' : ''}`}
				onClick={() => {
					if (open) {
						setSelected([]);
					}
					setOpen(!open);
				}}
			>
				Ingredients
			</button>
			{open && (
				<div className='filter-select-window'>
					<h3>Search for ingredients</h3>
					<SearchSelect
						placeholder='Search for ingredient...'
						selectedOptions={selected}
						options={ingredients.map(({ _id, name }) => ({
							id: _id,
							value: name,
						}))}
						loadingOptions={isLoading}
						handleRemoveOption={handleRemoveOption}
						handleAddOption={handleAddOption}
						handleSearchValue={searchIngredients}
					/>
					<div className='filter-select-window-buttons'>
						<Button
							size='small'
							onClick={() => {
								onApply(selected);
								setSelected([]);
								setOpen(false);
							}}
						>
							Apply
						</Button>

						<Button
							size='small'
							type='tertiary'
							variation='neutral'
							onClick={() => {
								setSelected([]);
								setOpen(false);
							}}
						>
							Cancel
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};

export default FilterIngredientSelect;
