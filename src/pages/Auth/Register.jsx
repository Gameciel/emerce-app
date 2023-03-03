import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/user";

class Register extends Component {
	state = {
		fullName: "",
		username: "",
		email: "",
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
			return <Redirect to="/" />;
		}
		return (
			<div className="container">
				<div className="row">
					<div className="col-12 text-center">
						<h1>Register Now!</h1>
						<p className="lead">
							Register and start shopping in the most affordable ecommerce
							platform
						</p>
					</div>
				</div>
				<div className="row mt-5">
					<div className="col-4 offset-4">
						<div className="card">
							<div className="card-body">
								<h5 className="font-weight-bold mb-3">Register</h5>
								<input
									name="fullName"
									onChange={this.inputHandler}
									placeholder="Full Name"
									type="text"
									className="form-control my-2"
								></input>
								<input
									name="username"
									onChange={this.inputHandler}
									placeholder="Username"
									type="text"
									className="form-control my-2"
								></input>
								<input
									name="email"
									onChange={this.inputHandler}
									placeholder="Email"
									type="email"
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
										onClick={() => this.props.registerUserHandler(this.state)}
										className="btn btn-primary"
									>
										Register
									</button>
									<Link to="/login">Or Login</Link>
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
	return {
		userGlobal: state.user,
	};
};

const mapDispatchToProps = {
	registerUserHandler: registerUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
