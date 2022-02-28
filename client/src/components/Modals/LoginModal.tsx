import { FC, useState } from 'react';
import { Button, Input } from 'components';
import { ModalWrapper } from 'hoc';
import { useAppDispatch } from 'hooks';
import { switchModal, toggleModal } from 'features';
import './AuthenticationModals.scss';

const LoginModal: FC = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const dispatch = useAppDispatch();

	return (
		<ModalWrapper
			onClose={() =>
				dispatch(toggleModal({ modal: 'loginModal', toggleOpen: false }))
			}
		>
			<div className='authentication-modals'>
				<h1>Login to your account</h1>
				<div className='inputs-section'>
					<Input
						title='Email'
						name='email'
						error=''
						value={email || ''}
						autoComplete='email'
						placeholder='Your email'
						onChange={(e) => setEmail(e.target.value)}
					/>
					<Input
						title='Password'
						name='password'
						error=''
						type='password'
						value={password || ''}
						autoComplete='current-password'
						placeholder='Your password'
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className='alternative-section'>
					<span>No account yet?</span>
					<span
						onClick={() =>
							dispatch(
								switchModal({
									from: 'loginModal',
									to: 'registerModal',
								})
							)
						}
					>
						Create one
					</span>
				</div>

				<div className='button-section'>
					<Button
						type='tertiary'
						variation='danger'
						onClick={() =>
							dispatch(toggleModal({ modal: 'loginModal', toggleOpen: false }))
						}
					>
						Cancel
					</Button>
					<Button onClick={() => console.log('Cancel Press')}>Login</Button>
				</div>
			</div>
		</ModalWrapper>
	);
};

export default LoginModal;
