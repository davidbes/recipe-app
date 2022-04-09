import { Button, Spinner } from 'components';
import SearchBar from 'components/SearchBar/SearchBar';
import { fetchIngredients } from 'features';
import { useAppDispatch, useAppSelector, useClickOutisde } from 'hooks';
import { Ingredient } from 'models/Recipe/Recipe.model';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { IoAdd, IoClose } from 'react-icons/io5';

interface Props {
	onChangeStep: (ingredients: Ingredient[], stepChange: number) => void;
	currIngredients: Ingredient[];
}

const UNITS = ['g', 'kg', 'mg', 'ml', 'l', 'dl', 'Tbsp', 'tsp', 'pcs'];

const AddIngredients: FC<Props> = ({ onChangeStep, currIngredients }) => {
	const [ingredients, setIngredients] = useState<Ingredient[]>(currIngredients);
	const [amount, setAmount] = useState<number | undefined>(undefined);
	const [shouldOpen, setShouldOpen] = useState(false);
	const [name, setName] = useState<string>('');
	const [sentName, setSentName] = useState<string>('');
	const [unit, setUnit] = useState<string>('');
	const [unitSelectOpen, setUnitSelectOpen] = useState<boolean>(false);

	const handleNext = useCallback(() => {
		if (ingredients.length > 0) {
			onChangeStep(ingredients, +1);
		}
	}, [ingredients]);

	const dispatch = useAppDispatch();

	const {
		isLoading,
		ingredients: foundIngredients,
		error,
	} = useAppSelector((state) => state.ingredientsSearch);

	useEffect(() => {
		const typingTimer = setTimeout(() => {
			if (sentName.trim() !== name.trim()) {
				if (name.trim().length >= 2) {
					dispatch(fetchIngredients(name));
					setSentName(name);
					setShouldOpen(true);
				} else {
					setSentName('');
				}
			}
		}, 600);
		return () => clearTimeout(typingTimer);
	}, [name, setName, sentName, setSentName]);

	const ref = useRef<HTMLDivElement>(null);
	useClickOutisde(ref, () => {
		setShouldOpen(false);
	});

	const unitRef = useRef<HTMLDivElement>(null);
	useClickOutisde(unitRef, () => {
		setUnitSelectOpen(false);
	});

	return (
		<>
			<div className='form-content'>
				Ingredients
				<div className='selected-ingredients'>
					{ingredients.map(({ _id, name, amount, unit }) => {
						return (
							<div className='selected-ingredient' key={_id}>
								<div className='ing-name'>{name}</div>
								{amount} {unit}
								<Button
									type='tertiary'
									variation='neutral'
									iconOnly
									onClick={() =>
										setIngredients(ingredients.filter((itm) => itm._id != _id))
									}
								>
									<IoClose />
								</Button>
							</div>
						);
					})}
				</div>
				<div className='add-ingredient'>
					<div className='ingredient-search-select'>
						<input
							className='ingredient-name-input'
							type='text'
							placeholder='Start entering ingredient name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>

						{sentName && shouldOpen && (
							<div className='results-list' ref={ref}>
								{isLoading ? (
									<div className='loading-results'>Loading...</div>
								) : foundIngredients.length > 0 ? (
									foundIngredients.map((ingredient) => (
										<div
											className='result'
											onClick={() => {
												setName(ingredient.name);
												setShouldOpen(false);
												setSentName(ingredient.name);
												setAmount(undefined);
											}}
										>
											{ingredient.name}
										</div>
									))
								) : (
									<div className='zero-matches-found'>
										<span className='no-match'>No matches found</span>
										<span
											onClick={() => setShouldOpen(false)}
											className='hide-link'
										>
											Hide
										</span>
									</div>
								)}
							</div>
						)}
					</div>

					<input
						className='amount-input'
						type='number'
						placeholder='Qty.'
						value={amount || 0}
						onChange={(e) => setAmount(+e.target.value)}
					/>

					<div className='unit-select'>
						<div
							onClick={() => setUnitSelectOpen(true)}
							className={`unit-input ${unit ? '' : 'empty'}`}
						>
							{unit ? unit : 'Unit'}
						</div>
						{unitSelectOpen && (
							<div ref={unitRef} className='units-options-list'>
								{UNITS.map((unit: string) => (
									<div
										onClick={() => {
											setUnit(unit);
											setUnitSelectOpen(false);
										}}
										className='unit-option'
									>
										{unit}
									</div>
								))}
							</div>
						)}
					</div>

					<Button
						type='primary'
						disabled={unit == '' || name == '' || amount == null}
						iconOnly
						onClick={() => {
							setIngredients([
								...ingredients,
								{
									_id: Date.now().toString(),
									amount: amount || 0,
									name: name,
									unit: unit,
								},
							]);

							setName('');
							setAmount(0);
							setUnit('');
						}}
					>
						<IoAdd size={16} />
					</Button>
				</div>
			</div>
			<div className='button-section'>
				<Button
					type='tertiary'
					variation='danger'
					onClick={() => onChangeStep(ingredients, -1)}
				>
					Previous
				</Button>
				<Button onClick={handleNext}>Next</Button>
			</div>
		</>
	);
};

export default AddIngredients;
