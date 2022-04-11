import { Button, Slider } from 'components';
import Checkbox from 'components/Checkbox/Checkbox';
import { FC, useCallback, useMemo, useState } from 'react';
import './CookingProcessComponents.scss';

interface Props {
	onFinish: (
		rating: number,
		duration: number,
		difficulty: number,
		serves: number
	) => void;
	defaultFeedback: {
		rating: number;
		difficulty: number;
		serves: number;
		duration: number;
	};
	processTime: { start: Date; end: Date };
}

const RateProcessStep: FC<Props> = ({
	onFinish,
	defaultFeedback,
	processTime,
}) => {
	const [duration, setDuration] = useState<number>(defaultFeedback.duration);
	const [rating, setRating] = useState<number>(defaultFeedback.rating);
	const [difficulty, setDifficulty] = useState<number>(
		defaultFeedback.difficulty
	);
	const [serves, setServes] = useState<number>(defaultFeedback.serves);
	const [trackUserSpent, setTrackUserSpent] = useState<boolean>(false);

	const userSpent = useMemo(() => {
		return Math.round(
			(processTime.end.getTime() - processTime.start.getTime()) / 1000 / 60
		);
	}, [processTime]);

	return (
		<>
			<div className='cooking-process-content'>
				<div className='rate-recipe-step'>
					<h3>How did you find the recipe?</h3>
					<div className='section'>
						<span className='section-title'>Rating</span>
						<Slider
							min={0}
							max={10}
							currValue={rating}
							onChange={(val) => setRating(val)}
						/>
						<span>{rating}</span>
					</div>
					<div className='section'>
						<span className='section-title'>Duration</span>
						<Slider
							min={0}
							max={400}
							currValue={duration}
							onChange={(val) => setDuration(val)}
						/>
						<span>{duration}</span>
					</div>
					<div className='section'>
						<span className='section-title'>Serves</span>
						<Slider
							min={0}
							max={10}
							currValue={serves}
							onChange={(val) => setServes(val)}
						/>
						<span>{serves}</span>
					</div>
					<div className='section'>
						<span className='section-title'>Difficulty</span>
						<Slider
							min={0}
							max={10}
							currValue={difficulty}
							onChange={(val) => setDifficulty(val)}
						/>
						<span>{difficulty}</span>
					</div>
				</div>
			</div>

			<div className='button-section'>
				<Button onClick={() => onFinish(rating, duration, difficulty, serves)}>
					Done
				</Button>
			</div>
		</>
	);
};

export default RateProcessStep;
