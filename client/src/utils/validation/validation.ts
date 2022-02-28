export const isEmail = (email: string): boolean =>
	/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

export const isPassword = (password: string): boolean => password.length >= 8;
