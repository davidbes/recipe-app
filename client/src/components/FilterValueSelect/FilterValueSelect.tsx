import { FC, useState, useEffect, useRef, useCallback } from 'react';
import { useClickOutisde } from 'hooks';
import './FilterValueSelect.scss';
import RangeSlider from 'components/RangeSlider/RangeSlider';
import { Button } from 'components';

interface Props {
	label: String;
	range: {
		minEdge: number;
		maxEdge: number;
	};
	onApply: (minValue: number, maxValue: number) => void;
	onReset: () => void;
}

const FilterValueSelect: FC<Props> = ({
	label,
	range: { minEdge, maxEdge },
	onApply,
	onReset,
}: Props) => {
	const [open, setOpen] = useState(false);
	const [currMinValue, setCurrMinValue] = useState<number | null>(null);
	const [currMaxValue, setCurrMaxValue] = useState<number | null>(null);
	const [appliedMin, setAppliedMin] = useState<number | null>(null);
	const [appliedMax, setAppliedMax] = useState<number | null>(null);

	const ref = useRef<HTMLDivElement>(null);
	useClickOutisde(ref, () => {
		setOpen(false);
		setCurrMaxValue(null);
		setCurrMinValue(null);
	});

	return (
		<div className='filter-value-select-wrapper' ref={ref}>
			<button
				className='filter-value-select-button'
				onClick={() => {
					if (open) {
						setCurrMaxValue(null);
						setCurrMinValue(null);
					}
					setOpen(!open);
				}}
			>
				{appliedMin != null && appliedMax != null
					? `${label}: ${appliedMin} - ${appliedMax}`
					: `Select ${label.toLowerCase()}`}
			</button>
			{open && (
				<div className='filter-value-window'>
					<span>
						Drag the slider to change the range of {label.toLowerCase()}.
					</span>
					<RangeSlider
						min={minEdge}
						max={maxEdge}
						currMin={currMinValue || appliedMin || minEdge}
						currMax={currMaxValue || appliedMax || maxEdge}
						onChange={({ min, max }: { min: number; max: number }) => {
							setCurrMinValue(min);
							setCurrMaxValue(max);
						}}
					/>
					<div className='button-section'>
						<Button
							size='small'
							onClick={() => {
								onApply(currMinValue || minEdge, currMaxValue || maxEdge);
								setAppliedMin(currMinValue || minEdge);
								setAppliedMax(currMaxValue || maxEdge);
								setOpen(false);
							}}
						>
							Apply
						</Button>
						{appliedMax != null && appliedMin != null && (
							<Button
								size='small'
								type='tertiary'
								variation='danger'
								onClick={() => {
									setAppliedMax(null);
									setAppliedMin(null);
									setCurrMaxValue(null);
									setCurrMinValue(null);
									setOpen(false);
									onReset();
								}}
							>
								Reset
							</Button>
						)}

						<Button
							size='small'
							type='tertiary'
							variation='neutral'
							onClick={() => {
								setCurrMaxValue(null);
								setCurrMinValue(null);
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

export default FilterValueSelect;
