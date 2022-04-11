import { Button } from 'components';
import { CookingProcessSection } from 'components/Modals/CookingProcessModal';
import { FC } from 'react';
import './CookingProcessComponents.scss';

interface Props {
	onChangeStep: (stepChange: number) => void;
	process: CookingProcessSection[];
	onMarkFinished: (code: string) => void;
	processFinished: boolean;
}

const CookingProcessStep: FC<Props> = ({
	onChangeStep,
	process,
	onMarkFinished,
	processFinished,
}) => {
	const currentlyInProcess = process
		.map((section) => {
			return section.instructions
				.filter((ins) => {
					return ins.conditions.length == 0;
				})
				.map((it) => it.code)
				.pop();
		})
		.filter((i) => i);

	return (
		<>
			<div className='cooking-process-content'>
				<div className='cooking-process-step-container'>
					<div className='process-heading-column'>
						{process.map((section, i) => {
							return (
								<div key={i} className='instructions-header'>
									{section.name}
								</div>
							);
						})}
					</div>
					<div className='process-instructions-wrapper'>
						{!processFinished ? (
							process.map((section, i) => {
								const inProcess = section.instructions.find(
									(ins) => ins.conditions.length == 0 && !ins.isDone
								);
								const willUnlock = section.instructions
									.filter(
										(ins) =>
											ins.conditions.length == 1 &&
											currentlyInProcess.includes(ins.conditions[0])
									)
									.shift();

								return (
									<div className='instructions-row' key={i}>
										<div
											className={`instruction-in-process ${
												inProcess ? 'active' : 'blank'
											}`}
											onClick={() => {
												if (inProcess) {
													onMarkFinished(inProcess.code);
												}
											}}
										>
											{inProcess && inProcess.instruction}
											{inProcess && (
												<div className='instruction-hover'>Mark complete</div>
											)}
										</div>
										<div
											className={`upcoming-instruction ${
												willUnlock ? '' : 'blank'
											}`}
										>
											{willUnlock && willUnlock.instruction}
										</div>
									</div>
								);
							})
						) : (
							<div>You are finished</div>
						)}
					</div>
				</div>
			</div>

			<div className='button-section'>
				<Button disabled={!processFinished} onClick={() => onChangeStep(+1)}>
					Finish Cooking
				</Button>
			</div>
		</>
	);
};

export default CookingProcessStep;
