import { Instruction } from 'models/Recipe/Recipe.model';
import { FC, useEffect, useState } from 'react';
import { generateLayout } from 'utils';
import './InstructionsList.scss';

interface Props {
	sections: {
		_id: string;
		code: string;
		name: string;
	}[];
	instructions: Instruction[];
}

const InstructionsList: FC<Props> = ({ sections, instructions }) => {
	// const [arrayItems, setArrayItems] = useState<any[]>([]);

	// useEffect(() => {
	// 	setArrayItems(generateLayout(sections, instructions));
	// }, [sections, instructions, arrayItems]);

	const generatedLayout = generateLayout(sections, instructions);

	return (
		<div className='instructions-list-wrapper'>
			<h3>Instructions</h3>
			<div className='instructions-list'>
				<div className='instructions-list-container'>
					<div className='instruction-section-header-row'>
						{sections.map((item) => {
							return (
								<div className='instruction-section-header' key={item._id}>
									{item.name}
								</div>
							);
						})}
					</div>
					{generatedLayout.map((row, i) => {
						return (
							<div className='instruction-section-row' key={i + ' a'}>
								{sections.map((col, idx) => {
									return row[col.code] ? (
										<div
											className='instruction-list-item'
											key={i + ' s ' + idx}
										>
											{row[col.code]}
										</div>
									) : (
										<div
											key={i + ' s ' + idx}
											className='instruction-list-item-blank'
										/>
									);
								})}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default InstructionsList;
