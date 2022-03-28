import Button from 'components/Button/Button';
import { FC, useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import './SearchBar.scss';

interface Props {
	searchValue: (value: string) => void;
}

const SearchBar: FC<Props> = ({ searchValue }: Props) => {
	const [value, setValue] = useState<string>('');
	const [sentValue, setSentValue] = useState<string>('');

	// This will prevent the site from calling the api on
	// every key stroke change. It will instead wait for
	// user to stop typing for 0.6s and then call the api.
	useEffect(() => {
		const typingTimer = setTimeout(() => {
			if (sentValue.trim() !== value.trim()) {
				searchValue(value);
				setSentValue(value);
			}
		}, 600);
		return () => clearTimeout(typingTimer);
	}, [value, setValue, sentValue, setSentValue]);

	return (
		<div className='searchbar-wrapper'>
			<input
				className='searchbar'
				type='text'
				placeholder='Search for meals...'
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>

			<Button
				iconOnly
				onClick={() => setValue('')}
				type='tertiary'
				variation='neutral'
			>
				<IoClose />
			</Button>
		</div>
	);
};

export default SearchBar;
