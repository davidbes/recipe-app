import { Spinner } from 'components';
import { ReactNode, FC } from 'react';

interface Props {
	isLoading: boolean;
	children: ReactNode;
}

const WithSpinner: FC<Props> = ({ isLoading, children }: Props) => {
	return isLoading ? <Spinner /> : <div>{children}</div>;
};
export default WithSpinner;
