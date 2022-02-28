import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: {
	confirmModal: boolean;
	registerModal: boolean;
	loginModal: boolean;
} = {
	confirmModal: false,
	registerModal: false,
	loginModal: false,
};

type ModalType = 'confirmModal' | 'registerModal' | 'loginModal';

interface ToggleProps {
	modal: ModalType;
	toggleOpen: boolean;
}

interface SwitchProps {
	from: ModalType;
	to: ModalType;
}

const modalsSlice = createSlice({
	name: 'modals',
	initialState,
	reducers: {
		toggleModal: (state, action: PayloadAction<ToggleProps>) => {
			state[action.payload.modal] = action.payload.toggleOpen;
		},
		switchModal: (state, action: PayloadAction<SwitchProps>) => {
			state[action.payload.from] = false;
			state[action.payload.to] = true;
		},
	},
});

export const { toggleModal, switchModal } = modalsSlice.actions;

export default modalsSlice.reducer;
