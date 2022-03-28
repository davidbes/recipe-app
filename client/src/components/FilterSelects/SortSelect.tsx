import { Button } from 'components';
import RadioButton from 'components/RadioButton/RadioButton';
import { useClickOutisde } from 'hooks';
import { FC, useState, useRef, useCallback } from 'react';

export type OrderType = 'ascending' | 'descending';
export type SortByType =
	| 'averages.rating'
	| 'averages.difficulty'
	| 'averages.time'
	| 'averages.serves'
	| 'dateAdded';

interface Props {
	order: OrderType;
	sortBy: SortByType;
	onApply: (order: OrderType, sortBy: SortByType) => void;
}

const SortSelect: FC<Props> = ({ order, sortBy, onApply }) => {
	const [currOrder, setCurrOrder] = useState<OrderType | null>(order);
	const [currSortBy, setCurrSortBy] = useState<SortByType | null>(sortBy);
	const [open, setOpen] = useState(false);

	const ref = useRef<HTMLDivElement>(null);

	useClickOutisde(ref, () => {
		setOpen(false);
		setCurrOrder(null);
		setCurrSortBy(null);
	});

	const orderChangeHandler = useCallback(
		(event) => {
			setCurrOrder(event.target.value);
		},
		[currOrder, setCurrOrder]
	);

	const sortByChangeHandler = useCallback(
		(event) => {
			setCurrSortBy(event.target.value);
		},
		[currOrder, setCurrOrder]
	);

	const sortOptions: { label: string; val: SortByType }[] = [
		{ label: 'Date added', val: 'dateAdded' },
		{ label: 'Rating', val: 'averages.rating' },
		{ label: 'Difficulty', val: 'averages.difficulty' },
		{ label: 'Duration', val: 'averages.time' },
		{ label: 'Servings', val: 'averages.serves' },
	];

	const orderOptions: { label: string; val: OrderType }[] = [
		{ label: 'Ascending', val: 'ascending' },
		{ label: 'Descending', val: 'descending' },
	];

	return (
		<div className='filter-select-wrapper' ref={ref}>
			<button
				className={`filter-select-button ${open ? 'open' : ''}`}
				onClick={() => {
					if (open) {
						setCurrOrder(null);
						setCurrSortBy(null);
					}
					setOpen(!open);
				}}
			>
				Sort By
			</button>
			{open && (
				<div className='filter-select-window'>
					<div className='filter-select-radio-section'>
						<div className='radio-section'>
							<h2>Sort by</h2>
							{sortOptions.map(({ label, val }, i) => (
								<RadioButton
									id={`sortby ${i}`}
									key={i}
									onChange={sortByChangeHandler}
									value={val}
									selectedValue={currSortBy || sortBy}
									label={label}
								/>
							))}
						</div>

						<div className='radio-section'>
							<h2>Sort order</h2>
							{orderOptions.map(({ label, val }, i) => (
								<RadioButton
									id={`order ${i}`}
									key={i}
									onChange={orderChangeHandler}
									value={val}
									selectedValue={currOrder || order}
									label={label}
								/>
							))}
						</div>
					</div>

					<div className='filter-select-window-buttons'>
						<Button
							size='small'
							onClick={() => {
								onApply(currOrder || order, currSortBy || sortBy);
								setCurrOrder(currOrder || order);
								setCurrSortBy(currSortBy || sortBy);
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
								setCurrOrder(null);
								setCurrSortBy(null);
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

export default SortSelect;
