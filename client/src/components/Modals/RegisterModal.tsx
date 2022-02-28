import { FC, useState } from 'react';
import { Button, Input } from 'components';
import { useAppDispatch } from 'hooks';
import { ModalWrapper } from 'hoc';
import { switchModal, toggleModal } from 'features';
import './AuthenticationModals.scss';

const RegisterModal: FC = () => {
	const [frName, setFrName] = useState<string>('');
	const [lsName, setLsName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');

	const dispatch = useAppDispatch();

	return (
		<ModalWrapper
			onClose={() =>
				dispatch(toggleModal({ modal: 'registerModal', toggleOpen: false }))
			}
		>
			<div className='authentication-modals'>
				<h1>Create a new account</h1>
				<div className='inputs-section'>
					<div className='name-wrapper'>
						<Input
							title='First name'
							name='name'
							error=''
							value={frName || ''}
							autoComplete='given-name'
							placeholder='Your first name'
							onChange={(e) => setFrName(e.target.value)}
						/>
						<Input
							title='Last name'
							name='last-name'
							error=''
							value={lsName || ''}
							autoComplete='family-name'
							placeholder='Your last name'
							onChange={(e) => setLsName(e.target.value)}
						/>
					</div>
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
						autoComplete='new-password'
						placeholder='Your password'
						onChange={(e) => setPassword(e.target.value)}
					/>
					<Input
						title='Confirm Password'
						name='confirmPassword'
						type='password'
						error=''
						value={confirmPassword || ''}
						autoComplete='new-password'
						placeholder='Confirm your password'
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>
				<div className='alternative-section'>
					<span>Already have an account?</span>
					<span
						onClick={() =>
							dispatch(
								switchModal({
									from: 'registerModal',
									to: 'loginModal',
								})
							)
						}
					>
						Login
					</span>
				</div>
				<div className='button-section'>
					<Button
						type='tertiary'
						variation='danger'
						onClick={() =>
							dispatch(
								toggleModal({ modal: 'registerModal', toggleOpen: false })
							)
						}
					>
						Cancel
					</Button>
					<Button onClick={() => console.log('Cancel Press')}>Register</Button>
				</div>
			</div>
		</ModalWrapper>
	);
};

export default RegisterModal;
