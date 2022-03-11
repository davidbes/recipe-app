import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Profile } from 'models/Profile/Profile.model';

interface MyProfileProps {
	user: {
		firstName: string;
		lastName: string;
		email: string;
		image?: string;
	};
	preferences: {
		langauge: string;
	};
}

export const fetchMyProfile = createAsyncThunk<
	MyProfileProps | { message: string }
>('profile/fetchMyProfile', async (_, thunkAPI) => {
	const { REACT_APP_SERVER_URL } = process.env;
	try {
		const token = localStorage.getItem('token');
		const response = await fetch(REACT_APP_SERVER_URL + '/api/profile/me', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: token || '',
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		return response.status === 200 ? data : thunkAPI.rejectWithValue(data);
	} catch (e) {
		return thunkAPI.rejectWithValue({
			message: 'An error occured!',
		});
	}
});

interface GetProfileState {
	isLoading: boolean;
	myProfile: MyProfileProps | null;
	error: {
		message: string;
	} | null;
}

const initialState = {
	isLoading: false,
	myProfile: null,
	error: null,
} as GetProfileState;

const getMyProfileSlice = createSlice({
	name: 'get my profile',
	initialState,
	reducers: {
		clearMyProfile: (state): void => {
			state.myProfile = null;
		},
	},
	extraReducers: (builder): void => {
		builder.addCase(fetchMyProfile.fulfilled, (state, { payload }) => {
			state.myProfile = payload as MyProfileProps;
			state.isLoading = false;
		});
		builder.addCase(fetchMyProfile.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(fetchMyProfile.rejected, (state, action) => {
			state.isLoading = false;
			state.error = action.payload as { message: string };
		});
	},
});

export const { clearMyProfile } = getMyProfileSlice.actions;

export default getMyProfileSlice.reducer;
