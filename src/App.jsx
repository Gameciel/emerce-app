import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";

import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Admin from "./pages/Admin";
import Cart from "./pages/Cart";
import History from "./pages/History";
import Home from "./pages/Home";

// import ProductDetail from "./pages/ProductDetail";
import ProductDetailFunctional from "./pages/ProductDetailFunctional";
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
					<Switch>
						<Route component={Cart} path="/cart" />
						<Route component={History} path="/history" />
						<Route
							component={ProductDetailFunctional}
							data={this.props.userGlobal.id}
							path="/detail/:id"
						/>
						{/* <Route component={<ProductDetail />} path="/detail/:id" /> */}
						<Route component={<Login />} path="/login" />
						<Route component={<Register />} path="/register" />
						<Route component={<Admin />} path="/admin" />
						<Route component={Home} path="/" />
					</Switch>
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
