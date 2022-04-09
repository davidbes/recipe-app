import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SnackbarState {
	isActive: boolean;
	message: string;
	type: 'error' | 'info' | 'success';
}

const initialState: SnackbarState = {
	isActive: false,
	message: '',
	type: 'error',
};

const snackbarSlice = createSlice({
	name: 'snackbar',
	initialState,
	reducers: {
		openSnackbar: (
			state,
			action: PayloadAction<{
				message: string;
				type: 'error' | 'info' | 'success';
			}>
		) => {
			state.type = action.payload.type;
			state.message = action.payload.message;
			state.isActive = true;
		},
		closeSnackbar: (state) => {
			state.isActive = false;
			state.message = '';
		},
	},
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
