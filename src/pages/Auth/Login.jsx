import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";

import { userLogin } from "../../redux/actions/user";

class Login extends Component {
	state = {
		username: "",
		password: "",
	};

	inputHandler = event => {
		const value = event.target.value;
		const name = event.target.name;

		this.setState({
			[name]: value,
		});
	};

	render() {
		if (this.props.userGlobal.username) {
			return <Navigate to="/" />;
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col-12 text-center">
						<h1>Login Now!</h1>
						<p className="lead">
							Login and start shopping in the most affordable ecommerce platform
						</p>
					</div>
				</div>

				<div className="row mt-5">
					<div className="col-4 offset-4">
						{this.props.userGlobal.errMsg ? (
							<div className="alert alert-danger">
								{this.props.userGlobal.errMsg}
							</div>
						) : null}
						<div className="card">
							<div className="card-body">
								<h5 className="font-weight-bold mb-3">Login</h5>
								<input
									name="username"
									onChange={this.inputHandler}
									placeholder="Username"
									type="text"
									className="form-control my-2"
								></input>
								<input
									name="password"
									onChange={this.inputHandler}
									placeholder="Password"
									type="password"
									className="form-control my-2"
								></input>
								<div className="d-flex flex-row justify-content-between align-items-center">
									<button
										onClick={() => this.props.userLoginHandler(this.state)}
										className="btn btn-primary"
									>
										Login
									</button>
									<Link to="/register">Or Register</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { userGlobal: state.user };
};

const mapDispatchToProps = {
	userLoginHandler: userLogin,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
