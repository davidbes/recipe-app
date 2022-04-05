import { FC, useState } from 'react';
import './StepProgressBar.scss';

interface Step {
	label: string;
	number: number;
}

interface Props {
	steps: string[];
	currentlyActive: number;
}

const StepProgressBar: FC<Props> = ({ steps, currentlyActive }) => {
	return (
		<div className='step-progress-bar'>
			{steps.map((label: string, i: number) => {
				return (
					<>
						<div
							className={`progress-step__wrapper ${
								currentlyActive >= i + 1
									? currentlyActive === i + 1
										? 'active'
										: 'done'
									: ''
							}`}
							key={i + 'step'}
						>
							<span className='progress-step__number'>{i + 1}</span>
							<span className='progress-step__label'>{label}</span>
						</div>
						{i < steps.length - 1 && (
							<div
								key={i + 'connector'}
								className={`progress-step__connector ${
									currentlyActive > i + 1 ? 'active' : ''
								}`}
							/>
						)}
					</>
				);
			})}
		</div>
	);
};

export default StepProgressBar;
