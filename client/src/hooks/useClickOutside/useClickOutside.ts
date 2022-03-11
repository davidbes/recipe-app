import { RefObject, useEffect } from 'react';

const useOnClickOutside = (
	ref: RefObject<any>,
	handler: (event: MouseEvent) => void
): void => {
	useEffect(() => {
		const listener = (event: MouseEvent) => {
			const el = ref?.current;
			if (!el || el.contains(event.target as Node)) {
				return;
			}
			handler(event);
		};

		document.addEventListener(`mousedown`, listener);

		return () => {
			document.removeEventListener(`mousedown`, listener);
		};
	}, [ref, handler]);
};

export default useOnClickOutside;
