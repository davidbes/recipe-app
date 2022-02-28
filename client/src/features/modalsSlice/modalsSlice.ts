import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
	confirmModal: boolean;
	authModal: boolean;
} = {
	confirmModal: false,
	authModal: false,
};

interface ToggleProps {
	modal: 'confirmModal' | 'authModal';
	toggleOpen: boolean;
}

const modalsSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		toggleModal: (state, action: PayloadAction<ToggleProps>) => {
			state[action.payload.modal] = action.payload.toggleOpen;
		},
	},
});

export const { toggleModal } = modalsSlice.actions;

export default modalsSlice.reducer;
