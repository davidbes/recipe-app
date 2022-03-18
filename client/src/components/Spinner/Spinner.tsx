import { FC } from 'react';
import './Spinner.scss';

const Spinner: FC = () => (
	<div className='loader'>
		<span></span>
		Loading...
	</div>
);

export default Spinner;
