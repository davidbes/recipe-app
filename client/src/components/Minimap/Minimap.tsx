import { GroupedData } from 'components/InstructionsList/InstructionsList';
import { FC, RefObject, useEffect } from 'react';
import './Minimap.scss';

interface Props {
	parentElementData: {
		positionLeft: number;
		positionTop: number;
		scrollWidth: number;
		scrollHeight: number;
		clientHeight: number;
		clientWidth: number;
	};
	data: GroupedData[];
	show: boolean;
}

const Minimap: FC<Props> = ({ data, parentElementData, show }) => {
	const {
		scrollHeight,
		scrollWidth,
		positionLeft,
		positionTop,
		clientHeight,
		clientWidth,
	} = parentElementData;

	return (
		<div
			className={`minimap ${show ? '' : 'hide'}`}
			style={{ height: scrollHeight / 7, width: scrollWidth / 7 }}
		>
			<div className='minimap-elements'>
				{data.map(({ instructions }, i) => {
					return (
						<div className='minimap-column' key={i}>
							<div className='minimap-col-title'>
								<div />
							</div>
							<div className='minimap-rows'>
								{instructions.map((ins, i) => {
									return (
										<div
											key={i}
											className={`minimap-item ${
												ins == 'blank' ? 'blank' : 'full'
											}`}
										/>
									);
								})}
							</div>
						</div>
					);
				})}
			</div>
			<div
				className='scroll-window'
				style={{
					top: `${positionTop}%`,
					left: `${positionLeft}%`,
					height: clientHeight / 7,
					width: clientWidth / 7,
				}}
			/>
		</div>
	);
};

export default Minimap;
