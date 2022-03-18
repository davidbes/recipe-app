import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Error } from 'models/Error/Error.model';

interface RegisterUserProps extends LoginUserProps {
	firstName: string;
	lastName: string;
}

interface LoginUserProps {
	email: string;
	password: string;
}

interface UserResponseProps {
	token: string;
	user: string;
	name: string;
	id: string;
	image?: string;
}

interface VerifyTokenProps {
	token: string;
}

export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async (
		{ firstName, lastName, email, password }: RegisterUserProps,
		thunkAPI
	) => {
		const { REACT_APP_SERVER_URL } = process.env;
		try {
			const response = await fetch(REACT_APP_SERVER_URL + '/auth/register', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					firstName: firstName,
					lastName: lastName,
					email,
					password,
				}),
			});
			const data = await response.json();
			return response.status === 200
				? (data as UserResponseProps)
				: thunkAPI.rejectWithValue(data as Error);
		} catch (e) {
			return thunkAPI.rejectWithValue({
				type: 'general',
				on: 'register',
				message: 'An error occured!',
			} as Error);
		}
	}
);

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async ({ email, password }: LoginUserProps, thunkAPI) => {
		const { REACT_APP_SERVER_URL } = process.env;
		try {
			const response = await fetch(REACT_APP_SERVER_URL + '/auth/login', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});
			const data = await response.json();
			return response.status === 200
				? (data as UserResponseProps)
				: thunkAPI.rejectWithValue(data as Error);
		} catch (e) {
			return thunkAPI.rejectWithValue({
				type: 'general',
				on: 'register',
				message: 'An error occured!',
			} as Error);
		}
	}
);

export const verifyToken = createAsyncThunk(
	'users/verifyToken',
	async ({ token }: VerifyTokenProps, thunkAPI) => {
		const { REACT_APP_SERVER_URL } = process.env;
		try {
			const response = await fetch(REACT_APP_SERVER_URL + '/auth/verify', {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					Authorization: token,
					'Content-Type': 'application/json',
				},
			});
			let data = await response.json();

			console.log(data);
			if (response.status === 200) {
				return data as UserResponseProps;
			} else {
				return thunkAPI.rejectWithValue(data);
			}
		} catch (e) {
			return thunkAPI.rejectWithValue({
				type: 'token',
				message: 'Token expired',
			});
		}
	}
);

interface AuthState {
	isAuth: boolean;
	isError: boolean;
	verifyLoading: boolean;
	isLoading: boolean;
	userId: string;
	error: Error | undefined;
	fullName: string;
	image: string;
}

const initialState = {
	isAuth: false,
	isLoading: false,
	verifyLoading: false,
	isError: false,
	userId: '',
	error: undefined,
	fullName: '',
	image: '',
} as AuthState;

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout: (state: AuthState): void => {
			localStorage.removeItem('token');
			state.isAuth = false;
		},
	},
	extraReducers: (builder): void => {
		builder.addCase(registerUser.fulfilled, (state, { payload }): void => {
			localStorage.setItem('token', payload.token);
			state.isAuth = true;
			state.isLoading = false;
			state.userId = payload.id;
			state.fullName = payload.name;
			state.image = '';
		});
		builder.addCase(registerUser.pending, (state): void => {
			state.isLoading = true;
			state.error = undefined;
			state.isError = false;
		});
		builder.addCase(registerUser.rejected, (state, action): void => {
			state.error = action.payload as Error;
			state.isAuth = false;
			state.isLoading = false;
			state.isError = true;
		});
		builder.addCase(loginUser.fulfilled, (state, { payload }): void => {
			localStorage.setItem('token', payload.token);
			state.isAuth = true;
			state.isLoading = false;
			state.userId = payload.id;
			state.fullName = payload.name;
			state.image = payload.image || '';
		});
		builder.addCase(loginUser.pending, (state): void => {
			state.isLoading = true;
			state.error = undefined;
			state.isError = false;
		});
		builder.addCase(loginUser.rejected, (state, action): void => {
			state.error = action.payload as Error;
			state.isAuth = false;
			state.isLoading = false;
			state.isError = true;
		});
		builder.addCase(verifyToken.fulfilled, (state, { payload }): void => {
			state.userId = payload.id;
			state.isAuth = true;
			state.verifyLoading = false;
			state.fullName = payload.name;
			state.image = payload.image || '';
		});
		builder.addCase(verifyToken.pending, (state): void => {
			state.verifyLoading = true;
			state.error = undefined;
			state.isError = false;
		});
		builder.addCase(verifyToken.rejected, (state, action): void => {
			state.isError = true;
			state.error = action.payload as Error;
			state.isAuth = false;
			state.verifyLoading = false;
		});
	},
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
