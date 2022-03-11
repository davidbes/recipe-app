import { FC, useCallback, useEffect, useState } from 'react';
import { Button, Input, InputState, Spinner } from 'components';
import { ModalWrapper } from 'hoc';
import { useAppDispatch, useAppSelector } from 'hooks';
import { loginUser, switchModal, toggleModal } from 'features';
import { isEmail } from 'utils/validation/validation';
import './AuthenticationModals.scss';

const LoginModal: FC = () => {
	const [email, setEmail] = useState<InputState>({ val: '', err: '' });
	const [pwd, setPwd] = useState<InputState>({ val: '', err: '' });

	const dispatch = useAppDispatch();

	const onSubmit = useCallback(() => {
		// Check for missing fields
		!email.val && setEmail({ ...email, err: 'Missing field!' });
		!pwd.val && setPwd({ ...pwd, err: 'Missing field!' });

		// Check valid fields!
		if (email.val && pwd.val) {
			const isValidEmail = isEmail(email.val);
			!isValidEmail && setEmail({ ...email, err: 'Invalid email!' });

			if (isValidEmail) {
				dispatch(
					loginUser({
						email: email.val,
						password: pwd.val,
					})
				);
			}
		}
	}, [email, pwd]);

	const { isError, isAuth, isLoading, error } = useAppSelector(
		(state) => state.auth
	);

	useEffect(() => {
		if (isError && error) {
			switch (error.on) {
				case 'email':
					setEmail({ ...email, err: error.message });
					break;
				case 'password':
					setPwd({ ...pwd, err: error.message });
					break;
				default:
					break;
			}
		}
	}, [isError, isAuth, error]);

	useEffect(() => {
		if (isAuth) {
			dispatch(toggleModal({ modal: 'loginModal', toggleOpen: false }));
		}
	}, [isAuth]);

	return (
		<ModalWrapper
			onClose={() =>
				dispatch(toggleModal({ modal: 'loginModal', toggleOpen: false }))
			}
		>
			<div className='authentication-modals'>
				{isLoading && !isAuth ? (
					<div className='centered-spinner'>
						<Spinner />
					</div>
				) : (
					<>
						<h1>Login to your account</h1>
						<div className='inputs-section'>
							<Input
								title='Email'
								name='email'
								error={email.err}
								value={email.val || ''}
								autoComplete='email'
								placeholder='Your email'
								onChange={(e) => setEmail({ val: e.target.value, err: '' })}
							/>
							<Input
								title='Password'
								name='password'
								error={pwd.err}
								type='password'
								value={pwd.val || ''}
								autoComplete='current-password'
								placeholder='Your password'
								onChange={(e) => setPwd({ val: e.target.value, err: '' })}
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
									dispatch(
										toggleModal({ modal: 'loginModal', toggleOpen: false })
									)
								}
							>
								Cancel
							</Button>
							<Button onClick={() => onSubmit()}>Login</Button>
						</div>
					</>
				)}
			</div>
		</ModalWrapper>
	);
};

export default LoginModal;
