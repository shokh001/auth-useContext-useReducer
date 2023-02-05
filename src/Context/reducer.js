let username = localStorage.getItem('currentUser')
	? JSON.parse(localStorage.getItem('currentUser')).username
	: '';
let token = localStorage.getItem('currentUser')
	? JSON.parse(localStorage.getItem('currentUser')).accessToken
	: '';

export const initialState = {
	username: '' || username,
	token: '' || token,
	loading: false,
	errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
	switch (action.type) {
		case 'REQUEST_LOGIN':
			return {
				...initialState,
				loading: true,
			};
		case 'LOGIN_SUCCESS':
			return {
				...initialState,
				username: action.payload.username,
				token: action.payload.accessToken,
				loading: false,
			};
		case 'REGISTER_SUCCESS':
			return {
				...initialState,
				loading: false,
			};
		case 'LOGOUT':
			return {
				...initialState,
				username: '',
				token: '',
			};

		case 'FETCH_ERROR':
			return {
				...initialState,
				loading: false,
				errorMessage: action.error,
			};

		default:
			throw new Error(`Unhandled action type: ${action.type}`);
	}
};
