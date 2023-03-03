import React, { Component } from "react";

import { connect } from "react-redux";

import {
	Navbar,
	NavbarBrand,
	NavbarText,
	Nav,
	NavItem,
	NavLink,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from "reactstrap";

import { userLogout } from "../redux/actions/user";

import { Link } from "react-router-dom";
import Axios from "axios";
import { API_URL } from "../constants/API";

class MyNavbar extends Component {
	state = {
		uniqueItem: 0,
		hasLoaded: false,
	};

	componentDidMount() {
		Axios.get(`${API_URL}/carts`, {
			params: {
				userId: this.props.userGlobal.id,
			},
		}).then(res => {
			this.setState({ uniqueItem: res.data.length });
			this.setState({ hasLoaded: true });
		});
	}

	loadData = () => {
		return <Link to="/cart">Cart: ({this.state.uniqueItem})</Link>;
	};

	componentDidUpdate() {
		let newData;

		Axios.get(`${API_URL}/carts`, {
			params: {
				userId: this.props.userGlobal.id,
			},
		})
			.then(res => {
				newData = res.data.length;
			})
			.then(() => {
				if (newData !== this.state.uniqueItem) {
					this.setState({ uniqueItem: newData });
				}
			});
	}

	render() {
		return (
			<div>
				<Navbar color="light" light>
					<NavbarBrand>
						<NavLink href="/">Emerce</NavLink>
					</NavbarBrand>
					<Nav>
						{this.props.userGlobal.username ? (
							<>
								<NavItem>
									<NavbarText>
										Hello,
										{this.props.userGlobal.role === "admin"
											? `⭐ ${this.props.userGlobal.username} ⭐`
											: `${this.props.userGlobal.username}`}
									</NavbarText>
								</NavItem>
								<UncontrolledDropdown nav inNavbar>
									<DropdownToggle nav caret>
										Pages
									</DropdownToggle>
									<DropdownMenu right>
										<DropdownItem>{this.loadData()}</DropdownItem>
										<DropdownItem>
											<Link to="/history">History</Link>
										</DropdownItem>
										{this.props.userGlobal.role === "admin" ? (
											<DropdownItem>
												<Link to="/admin">Admin</Link>
											</DropdownItem>
										) : null}
										<DropdownItem divider />
										<DropdownItem>
											<Link onClick={this.props.userLogout}>Logout</Link>
										</DropdownItem>
									</DropdownMenu>
								</UncontrolledDropdown>
							</>
						) : (
							<NavItem>
								<NavbarText>
									<Link to="/login">Login</Link> |{" "}
									<Link to="/register">Register</Link>
								</NavbarText>
							</NavItem>
						)}
					</Nav>
				</Navbar>
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
	userLogout,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);
