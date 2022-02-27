import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Error } from 'models/Error/Error.model';

interface RegisterUserProps {
	name: string;
	email: string;
	password: string;
}

interface RegisterUserResponseProps {
	token: string;
	user: string;
}

export const registerUser = createAsyncThunk(
	'auth/registerUser',
	async ({ name, email, password }: RegisterUserProps, thunkAPI) => {
		const { REACT_APP_SERVER_URL } = process.env;
		try {
			const response = await fetch(REACT_APP_SERVER_URL + '/auth/register', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			});
			const data = await response.json();
			return response.status === 200
				? (data as RegisterUserResponseProps)
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

interface AuthState {
	isAuth: boolean;
	isLoading: boolean;
	userId: string;
	error: Error | undefined;
	fullName: string;
	imageUrl: string;
}

const initialState = {
	isAuth: false,
	isLoading: false,
	userId: '',
	error: undefined,
	fullName: '',
	imageUrl: '',
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
			state.userId = payload.user;
			state.isAuth = true;
			state.isLoading = false;
		});
		builder.addCase(registerUser.pending, (state): void => {
			state.isLoading = true;
		});
		builder.addCase(registerUser.rejected, (state, action): void => {
			state.isAuth = false;
			state.isLoading = false;
			state.error = action.payload as Error;
		});
	},
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
