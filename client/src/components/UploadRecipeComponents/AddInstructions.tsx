import { Button } from 'components';
import InstructionDialog from 'components/InstructionDialog/InstructionDialog';
import { ChangeEvent, FC, useCallback, useState } from 'react';
import { IoAdd, IoClose } from 'react-icons/io5';

interface Props {
	onChangeStep: (currSections: Section[], stepChange: number) => void;
	currSections: Section[];
}

interface InstructionInput {
	instruction: string;
	warning: string;
}

export interface Section {
	id: string;
	name: string;
	instructions: (InstructionInput | 'blank')[];
}

const AddInstructions: FC<Props> = ({ onChangeStep, currSections }) => {
	const [sections, setSections] = useState<Section[]>(currSections);
	const [dialog, setDialog] = useState<{
		open: boolean;
		sectionId?: string;
		index?: number;
	}>({ open: false });

	const handleNext = useCallback(() => {
		if (sections.length > 0) {
			onChangeStep(sections, +1);
		}
	}, [sections]);

	const handleSectionNameInput = useCallback(
		({ target: { value } }: ChangeEvent<HTMLInputElement>, id: string) => {
			setSections(
				sections.map((item) => {
					if (item.id == id) {
						return { ...item, name: value };
					}
					return item;
				})
			);
		},
		[sections]
	);

	const handleRemoveSection = useCallback(
		(id: string) => {
			setSections(sections.filter((item) => item.id !== id));
		},
		[sections]
	);

	const handleInstructionNameInput = useCallback(
		(
			{ target: { value } }: ChangeEvent<HTMLInputElement>,
			id: string,
			index: number
		) => {
			setSections(
				sections.map((item) => {
					if (item.id == id) {
						return {
							...item,
							instructions: item.instructions.map((inst, idx) => {
								if (idx == index && inst !== 'blank') {
									return { ...inst, instruction: value };
								}
								return inst;
							}),
						};
					}
					return item;
				})
			);
		},
		[sections]
	);

	const handleRemoveInstruction = useCallback(
		(id: string, index: number) => {
			setSections(
				sections.map((section) => {
					if (section.id == id) {
						return {
							...section,
							instructions: section.instructions.map((instruction, i) =>
								i == index ? 'blank' : instruction
							),
						};
					}
					return section;
				})
			);
		},
		[sections]
	);
	const handleAddInstruction = useCallback(
		(recInstruction: string, recWarning: string) => {
			const { sectionId, index } = dialog;
			const newSections =
				index == sections[0].instructions.length - 1
					? sections.map(({ id, name, instructions }) => {
							return {
								id: id,
								name: name,
								instructions: [...instructions, 'blank'],
							} as Section;
					  })
					: sections;

			// Go through sections and replace the blank with the Instruction input
			setSections(
				newSections.map((section) => {
					if (section.id == sectionId) {
						return {
							...section,
							instructions: section.instructions.map((instruction, i) =>
								i == index
									? {
											instruction: recInstruction,
											warning: recWarning,
									  }
									: instruction
							),
						};
					}
					return section;
				})
			);
			setDialog({
				open: false,
				index: undefined,
				sectionId: undefined,
			});
		},
		[dialog, sections]
	);
	return (
		<>
			<div className='form-content'>
				Add instructions
				<div className='instruction-sections-wrapper'>
					<div className='instruction-sections'>
						{sections.map(({ id, name, instructions }) => {
							return (
								<div className='instruction-section' key={id}>
									<input
										value={name}
										placeholder='Section name'
										className='instruction-section-name-input'
										onChange={(e) => handleSectionNameInput(e, id)}
									/>
									<div className='section-instructions'>
										{instructions.map((instruction, index: number) => {
											return instruction === 'blank' ? (
												<div
													className='blank-instruction'
													onClick={() =>
														setDialog({
															open: true,
															sectionId: id,
															index: index,
														})
													}
													key={index + instruction}
												>
													<div className='add-circle'>
														<IoAdd />
													</div>
												</div>
											) : (
												<div
													className='section-instruction-item'
													key={instruction.instruction + index}
												>
													{instruction.instruction}
													<Button
														iconOnly
														variation='danger'
														type='tertiary'
														onClick={() => handleRemoveInstruction(id, index)}
													>
														<IoClose />
													</Button>
												</div>
											);
										})}
									</div>

									<div
										className='remove-section'
										onClick={() => handleRemoveSection(id)}
									>
										Remove Section
									</div>
								</div>
							);
						})}

						<Button
							onClick={() => {
								if (sections.length == 0) {
									setSections([
										{
											id: Date.now().toString(),
											name: '',
											instructions: ['blank'],
										},
									]);
								} else {
									const blanks = new Array(
										sections[0].instructions.length
									).fill('blank');
									setSections([
										...sections,
										{
											id: Date.now().toString(),
											name: '',
											instructions: blanks,
										},
									]);
								}
							}}
						>
							New Section
						</Button>
					</div>
					{dialog.open && (
						<InstructionDialog
							onCancel={() =>
								setDialog({
									open: false,
									sectionId: undefined,
									index: undefined,
								})
							}
							onSucess={(instruction: string, warning: string) =>
								handleAddInstruction(instruction, warning)
							}
						/>
					)}
				</div>
			</div>

			<div className='button-section'>
				<Button
					type='tertiary'
					variation='danger'
					onClick={() => onChangeStep(sections, -1)}
				>
					Previous
				</Button>
				<Button onClick={handleNext}>Next</Button>
			</div>
		</>
	);
};

export default AddInstructions;
