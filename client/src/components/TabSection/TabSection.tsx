import { FC, ReactNode, useState } from 'react';
import './TabSection.scss';

type NonEmptyArray<T> = [T, ...T[]];

interface Props {
	tabs: NonEmptyArray<{
		element: ReactNode;
		label: string;
	}>;
}

const TabSection: FC<Props> = ({ tabs }: Props) => {
	const [active, setActive] = useState<number>(0);

	return (
		<div className='tab-section'>
			<div className='header'>
				{tabs.map((tab, i: number) => (
					<div
						className={`header-item ${active === i ? 'active' : ''}`}
						onClick={() => setActive(i)}
					>
						<span>{tab.label}</span>
					</div>
				))}
			</div>
			<div className='tab-content'>{tabs[active].element}</div>
		</div>
	);
};

export default TabSection;
