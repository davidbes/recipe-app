import Spinner from 'components/Spinner/Spinner';
import { FC, useCallback, useEffect, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import './SearchSelect.scss';

export type Option = {
	id: string;
	value: string;
};

interface Props {
	selectedOptions: Option[];
	options: Option[];
	loadingOptions: boolean;
	handleRemoveOption: (id: string) => void;
	handleSearchValue: (value: string) => void;
	handleAddOption: (option: Option) => void;
}

const SearchSelect: FC<Props> = ({
	selectedOptions,
	options,
	loadingOptions,
	handleRemoveOption,
	handleSearchValue,
	handleAddOption,
}) => {
	const [value, setValue] = useState<string>('');
	const [sentValue, setSentValue] = useState<string>('');

	useEffect(() => {
		const typingTimer = setTimeout(() => {
			if (sentValue.trim() !== value.trim()) {
				if (value.trim().length >= 2) {
					handleSearchValue(value);
					setSentValue(value);
				} else {
					setSentValue('');
				}
			}
		}, 600);
		return () => clearTimeout(typingTimer);
	}, [value, setValue, sentValue, setSentValue]);

	console.log(loadingOptions, options);

	return (
		<div className='search-select-wrapper'>
			<div className='search-select'>
				{selectedOptions.map(({ id, value }) => (
					<div
						className='selected-option'
						onClick={() => {
							handleRemoveOption(id);
						}}
					>
						{value}
						<IoIosClose size={20} />
					</div>
				))}
				<input
					className='search-select-input'
					type='text'
					value={value}
					placeholder='Search badge...'
					onChange={(e) => setValue(e.target.value)}
				/>
			</div>
			{sentValue && (
				<div className='results-list'>
					{loadingOptions ? (
						<Spinner />
					) : options.length > 0 ? (
						options.map((option) => (
							<div
								className='result'
								onClick={() => {
									setValue('');
									setSentValue('');
									handleAddOption(option);
								}}
							>
								{option.value}
							</div>
						))
					) : (
						<span className='no-match'>No matches found</span>
					)}
				</div>
			)}
		</div>
	);
};

export default SearchSelect;
