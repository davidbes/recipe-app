import { FC, useCallback, useMemo, useState } from 'react';
import { Button, Input, InputState } from 'components';
import { useAppDispatch } from 'hooks';
import { ModalWrapper } from 'hoc';
import { switchModal, toggleModal, registerUser } from 'features';
import { isEmail, isPassword } from 'utils';
import './AuthenticationModals.scss';

const RegisterModal: FC = () => {
	const [frName, setFrName] = useState<InputState>({ val: '', err: '' });
	const [lsName, setLsName] = useState<InputState>({ val: '', err: '' });
	const [email, setEmail] = useState<InputState>({ val: '', err: '' });
	const [pwd, setPwd] = useState<InputState>({ val: '', err: '' });
	const [cnfrmPwd, setCnfrmPwd] = useState<InputState>({ val: '', err: '' });

	const dispatch = useAppDispatch();

	const onSubmit = useCallback(() => {
		// Check for missing fields
		!frName.val && setFrName({ ...frName, err: 'Missing field!' });
		!lsName.val && setLsName({ ...lsName, err: 'Missing field!' });
		!email.val && setEmail({ ...email, err: 'Missing field!' });
		!pwd.val && setPwd({ ...pwd, err: 'Missing field!' });
		!cnfrmPwd.val && setCnfrmPwd({ ...cnfrmPwd, err: 'Missing field!' });

		// Check valid fields!
		if (frName.val && lsName.val && email.val && pwd.val && cnfrmPwd.val) {
			const isValidEmail = isEmail(email.val);
			!isValidEmail && setEmail({ ...email, err: 'Invalid email!' });

			const isValidPwd = isPassword(pwd.val);
			!isValidPwd &&
				setPwd({ ...pwd, err: 'Password must be at least 8 characters long!' });

			const pwdsMatch = pwd.val === cnfrmPwd.val;
			!pwdsMatch && setCnfrmPwd({ ...cnfrmPwd, err: 'Passwords must match!' });

			if (isValidEmail && isValidPwd && pwdsMatch) {
				// Send request.
				dispatch(
					registerUser({
						firstName: frName.val,
						lastName: lsName.val,
						email: email.val,
						password: pwd.val,
					})
				);
			}
		}
	}, [frName, lsName, email, pwd, cnfrmPwd]);

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
							error={frName.err}
							value={frName.val || ''}
							autoComplete='given-name'
							placeholder='Your first name'
							onChange={(e) => setFrName({ val: e.target.value, err: '' })}
						/>
						<Input
							title='Last name'
							name='last-name'
							error={lsName.err}
							value={lsName.val || ''}
							autoComplete='family-name'
							placeholder='Your last name'
							onChange={(e) => setLsName({ val: e.target.value, err: '' })}
						/>
					</div>
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
						autoComplete='new-password'
						placeholder='Your password'
						onChange={(e) => setPwd({ val: e.target.value, err: '' })}
					/>
					<Input
						title='Confirm Password'
						name='confirmPassword'
						type='password'
						error={cnfrmPwd.err}
						value={cnfrmPwd.val || ''}
						autoComplete='new-password'
						placeholder='Confirm your password'
						onChange={(e) => setCnfrmPwd({ val: e.target.value, err: '' })}
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
					<Button onClick={() => onSubmit()}>Register</Button>
				</div>
			</div>
		</ModalWrapper>
	);
};

export default RegisterModal;
