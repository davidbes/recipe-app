import { Badge, Button } from 'components';
import { toggleModal } from 'features';
import { ModalWrapper, WithTooltip } from 'hoc';
import { useAppDispatch, useAppSelector } from 'hooks';
import { FC, useState } from 'react';
import { Badge as BadgeType } from 'models';
import './BadgesList.scss';

interface Props {
	badges: BadgeType[];
}

const BadgesList: FC<Props> = ({ badges }: Props) => {
	const [maxShown, setMaxShown] = useState<number>(3);

	const dispatch = useAppDispatch();

	const { badgesModal } = useAppSelector((state) => state.modals);

	const otherBadges = badges.slice(maxShown, badges.length);

	return badges.length > 0 ? (
		<>
			<div className='badges-list'>
				{badges.slice(0, maxShown).map((itm) => (
					<Badge name={itm.name} description={itm.description} />
				))}

				{otherBadges.length > 0 && (
					<WithTooltip content={`Click to see all badges`}>
						<div
							className='more-badges'
							onClick={() =>
								dispatch(
									toggleModal({ modal: 'badgesModal', toggleOpen: true })
								)
							}
						>
							+{otherBadges.length}
						</div>
					</WithTooltip>
				)}
			</div>

			{badgesModal && (
				<ModalWrapper
					onClose={() =>
						dispatch(toggleModal({ modal: 'badgesModal', toggleOpen: false }))
					}
				>
					<div className='modal-content'>
						<h2>All badges</h2>
						<div className='modal-badges-list'>
							{badges.map((itm) => (
								<div className='inline-badge'>
									<img
										src={
											process.env.REACT_APP_SERVER_URL +
											'/images/badges/' +
											itm.name +
											'.png'
										}
										alt='badge'
									/>
									{itm.description || itm.name}
								</div>
							))}
						</div>
						<div className='actions'>
							<Button
								type='tertiary'
								variation='danger'
								onClick={() =>
									dispatch(
										toggleModal({ modal: 'badgesModal', toggleOpen: false })
									)
								}
							>
								Close
							</Button>
						</div>
					</div>
				</ModalWrapper>
			)}
		</>
	) : (
		<></>
	);
};

export default BadgesList;
