import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import History from "./pages/History";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";

import MyNavbar from "./components/MyNavbar";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

import { connect } from "react-redux";

import { userLogged, checkStorage } from "./redux/actions/user";

class App extends Component {
	componentDidMount() {
		const userLocalStorage = localStorage.getItem("userDataEmerce");

		if (userLocalStorage) {
			const userData = JSON.parse(userLocalStorage);
			this.props.userLogged(userData);
		} else {
			this.props.checkStorage();
		}
	}

	render() {
		if (this.props.userGlobal.storageIsChecked) {
			return (
				<BrowserRouter>
					<MyNavbar />
					<Routes>
						<Route element={<Cart />} path="/cart" />
						<Route element={<History />} path="/history" />
						<Route element={<ProductDetail />} path="/detail" />
						<Route element={<Login />} path="/login" />
						<Route element={<Register />} path="/register" />
						<Route element={<Admin />} path="/admin" />
						<Route element={<Home />} path="/" />
					</Routes>
				</BrowserRouter>
			);
		} else {
			return <div>Loading...</div>;
		}
	}
}

const mapStateToProps = state => {
	return {
		userGlobal: state.user,
	};
};

const mapDispatchToProps = {
	userLogged,
	checkStorage,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
