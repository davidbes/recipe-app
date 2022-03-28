import { FC, useState, useRef, useCallback } from 'react';
import { useAppDispatch, useAppSelector, useClickOutisde } from 'hooks';
import './FilterSelects.scss';
import { Button } from 'components';
import SearchSelect from 'components/SearchSelect/SearchSelect';
import { fetchBadges } from 'features';
import { Option } from '../SearchSelect/SearchSelect';

interface Props {}

const FilterBadgeSelect: FC<Props> = ({}: Props) => {
	const [open, setOpen] = useState(false);

	const [selected, setSelected] = useState<Option[]>([]);

	const dispatch = useAppDispatch();

	const ref = useRef<HTMLDivElement>(null);
	useClickOutisde(ref, () => {
		setOpen(false);
	});

	const { isLoading, badges, error } = useAppSelector(
		(state) => state.badgesSearch
	);

	const searchBadges = useCallback((value) => {
		dispatch(fetchBadges(value));
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
		},
		[selected, setSelected]
	);

	return (
		<div className='filter-select-wrapper' ref={ref}>
			<button
				className={`filter-select-button ${open ? 'open' : ''}`}
				onClick={() => {
					if (open) {
					}
					setOpen(!open);
				}}
			>
				Badges
			</button>
			{open && (
				<div className='filter-select-window'>
					<h3>Search for badges</h3>
					<SearchSelect
						selectedOptions={selected}
						options={badges.map(({ _id, name }) => ({ id: _id, value: name }))}
						loadingOptions={isLoading}
						handleRemoveOption={handleRemoveOption}
						handleAddOption={handleAddOption}
						handleSearchValue={searchBadges}
					/>
					<div className='filter-select-window-buttons'>
						<Button
							size='small'
							onClick={() => {
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

export default FilterBadgeSelect;
