import Minimap from 'components/Minimap/Minimap';
import { Instruction, ProcessGroup } from 'models/Recipe/Recipe.model';
import {
	FC,
	RefObject,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import { displayPartsToString } from 'typescript';
import { groupData } from 'utils';
import './InstructionsList.scss';

interface Props {
	process: ProcessGroup[];
}

export interface GroupedData {
	_id: string;
	name: string;
	instructions: (Instruction | 'blank')[];
}

interface MinimapData {
	positionTop: number;
	positionLeft: number;
	scrollWidth: number;
	scrollHeight: number;
	clientWidth: number;
	clientHeight: number;
}

const defaultMinimapData = {
	positionTop: 0,
	positionLeft: 0,
	scrollWidth: 500,
	scrollHeight: 800,
	clientWidth: 400,
	clientHeight: 500,
};

const InstructionsList: FC<Props> = ({ process }) => {
	const groupedData: GroupedData[] = groupData(process);
	// const [ref, setRef] = useState<any>();
	const ref = useRef<HTMLDivElement>(null);

	const [minimapData, setMinimapData] =
		useState<MinimapData>(defaultMinimapData);

	const [displayMinimap, setDisplayMinimap] = useState(false);

	const handleScroll = useCallback(() => {
		if (ref.current) {
			const it = ref.current;
			setMinimapData({
				scrollHeight: it.scrollHeight,
				scrollWidth: it.scrollWidth,
				positionLeft: (100 * it.scrollLeft) / it.scrollWidth,
				positionTop: (100 * it.scrollTop) / it.scrollHeight,
				clientWidth: it.clientWidth,
				clientHeight: it.clientHeight,
			});
			setDisplayMinimap(true);
		}
	}, [ref]);

	useEffect(() => {
		const typingTimer = setTimeout(() => {
			setDisplayMinimap(false);
		}, 2000);
		return () => clearTimeout(typingTimer);
	}, [displayMinimap]);

	return (
		<div className='instructions-list-wrapper'>
			<h3>Instructions</h3>
			<div onScroll={handleScroll} ref={ref} className='instructions-list'>
				<div className='instructions-list-container'>
					{groupedData.map(({ _id, name, instructions }) => {
						return (
							<div className='instructions-group' key={_id}>
								<div className='instruction-group-header'>{name}</div>
								<div className='instruction-group-items'>
									{instructions.map((item, i) => {
										return item === 'blank' ? (
											<div key={i} className='instruction-group-blank' />
										) : (
											<div key={item._id} className='instruction-group-item'>
												{item.instruction}
											</div>
										);
									})}
								</div>
							</div>
						);
					})}
				</div>
			</div>
			<Minimap
				show={displayMinimap}
				data={groupedData}
				parentElementData={minimapData}
			/>
		</div>
	);
};

export default InstructionsList;
