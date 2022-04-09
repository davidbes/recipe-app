import { Button } from 'components';
import TextArea from 'components/TextArea/TextArea';
import { useClickOutisde } from 'hooks';
import { FC, useRef, useState } from 'react';
import './InstructionDialog.scss';

interface Props {
	onCancel: () => void;
	onSucess: (instruction: string, warning: string) => void;
}

const InstructionDialog: FC<Props> = ({ onCancel, onSucess }) => {
	const [instruction, setInstruction] = useState('');
	const [warning, setWarning] = useState('');

	const ref = useRef<HTMLDivElement>(null);
	useClickOutisde(ref, () => {
		onCancel();
	});

	return (
		<div className='instruction-dialog-shadow'>
			<div ref={ref} className='dialog'>
				Add the instruction to the section
				<TextArea
					placeholder='Enter the instruction...'
					label='Instruction'
					value={instruction}
					cols={30}
					rows={3}
					onChange={(string) => setInstruction(string)}
				/>
				<TextArea
					placeholder='If you have any warnings for the step...'
					label='Warning'
					value={warning}
					cols={30}
					rows={2}
					onChange={(string) => setWarning(string)}
				/>
				<Button onClick={() => onSucess(instruction, warning)}>Finish</Button>
			</div>
		</div>
	);
};

export default InstructionDialog;
