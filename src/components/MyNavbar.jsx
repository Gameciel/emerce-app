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

class MyNavbar extends Component {
	render() {
		return (
			<div>
				<Navbar color="light" light>
					<NavbarBrand>
						<NavLink href="/"> Emerce</NavLink>
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
										<DropdownItem>
											<Link to="/cart">Cart</Link>
										</DropdownItem>
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
