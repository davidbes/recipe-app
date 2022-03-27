import { useEffect, useState } from 'react';

const useImageUrl = (img: string): string => {
	const [url, setUrl] = useState<string>(img);

	const { REACT_APP_SERVER_URL } = process.env;

	useEffect(() => {
		if (img?.split('/').shift() === 'images') {
			setUrl(REACT_APP_SERVER_URL + '/' + img);
		} else {
			setUrl(img);
		}
	}, [img, url, REACT_APP_SERVER_URL]);

	return url;
};

export default useImageUrl;
