import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SnackbarState {
	isActive: boolean;
	message: string;
	type: 'error' | 'info' | 'success' | 'warning';
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
				type: 'error' | 'info' | 'success' | 'warning';
			}>
		) => {
			state.isActive = true;
			state.message = action.payload.message;
			state.type = action.payload.type;
		},
		closeSnackbar: (state) => {
			state.isActive = false;
			state.message = '';
		},
	},
});

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions;

export default snackbarSlice.reducer;
