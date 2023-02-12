import axios from "axios";
import Axios from "axios";
import { API_URL } from "../../constants/API";

export const registerUser = data => {
	return dispatch => {
		Axios.post(`${API_URL}/users`, {
			fullName: data.fullName,
			username: data.username,
			email: data.email,
			password: data.password,
			role: "user",
		})
			.then(res => {
				delete res.data.password;
				localStorage.setItem("userDataEmerce", JSON.stringify(res.data[0]));
				dispatch({
					type: "USER_LOGIN",
					payload: res.data,
				});
			})
			.catch(err => alert(`Error: ${err}`));
	};
};

export const userLogin = data => {
	return dispatch => {
		Axios.get(`${API_URL}/users`, {
			params: {
				username: data.username,
			},
		}).then(res => {
			if (res.data.length) {
				if (data.password === res.data[0].password) {
					delete res.data[0].password;

					localStorage.setItem("userDataEmerce", JSON.stringify(res.data[0]));

					dispatch({
						type: "USER_LOGIN",
						payload: res.data[0],
					});
				} else {
					// handleError wrong password
					dispatch({
						type: "LOGIN_ERROR",
						payload: "Wrong password!",
					});
				}
			} else {
				// handleError no username
				dispatch({
					type: "LOGIN_ERROR",
					payload: "Username not found!",
				});
			}

			dispatch({
				type: "USER_LOGIN",
				payload: res.data[0],
			});
		});
	};
};

export const userLogout = () => {
	localStorage.removeItem("userDataEmerce");
	return {
		type: "USER_LOGOUT",
	};
};

export const userLogged = userData => {
	return dispatch => {
		Axios.get(`${API_URL}/users`, {
			params: {
				id: userData.id,
			},
		})
			.then(res => {
				localStorage.setItem("userDataEmerce", JSON.stringify(res.data[0]));
				dispatch({
					type: "USER_LOGIN",
					payload: res.data[0],
				});
			})
			.catch(err => console.log(err));
	};
};

export const checkStorage = () => {
	return {
		type: "CHECK_STORAGE",
	};
};
