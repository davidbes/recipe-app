import { useTranslation } from 'react-i18next';

const App = () => {
	const { t, i18n } = useTranslation();
	return (
		<div>
			{t('hello')}
			<div className='footer'>
				<button onClick={() => i18n.changeLanguage('en')}>English</button>
				<button onClick={() => i18n.changeLanguage('si')}>Slovenian</button>
			</div>
		</div>
	);
};

export default App;
