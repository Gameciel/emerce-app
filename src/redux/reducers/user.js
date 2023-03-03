const init_state = {
	username: "",
	fullName: "",
	email: "",
	role: "",
	id: 0,
	errMsg: "",
	uniqueItem: 0,
	storageIsChecked: false,
};

const userReducer = (state = init_state, action) => {
	switch (action.type) {
		// case "ADD_CART":
		// 	return { ...state, uniqueItem: action.payload };

		case "USER_LOGIN":
			return { ...state, ...action.payload, storageIsChecked: true };

		case "LOGIN_ERROR":
			return { ...state, errMsg: action.payload };

		case "USER_LOGOUT":
			return { ...init_state, storageIsChecked: true };

		case "CHECK_STORAGE":
			return { ...state, storageIsChecked: true };
		default:
			return state;
	}
};

export default userReducer;
