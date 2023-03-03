import React, { Component } from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { withRouter } from "react-router";

class ProductDetail extends Component {
	state = {
		productData: {},
		qty: 0,
	};

	fetchData = () => {
		console.log(this.props);
		Axios.get(`${API_URL}/products`, {
			params: {
				id: this.props.match.params.id,
			},
		})
			.then(res => {
				this.setState({ productData: res.data[0] });
			})
			.catch(err => {
				console.log(err);
			});
	};

	componentDidMount() {
		this.fetchData();
	}

	render() {
		return (
			<div>Hi</div>
			// <div className="container">
			// 	<div className="row mt-3">
			// 		<div className="col-6">
			// 			<img
			// 				style={{ width: "100%" }}
			// 				src={this.productData.productImage}
			// 				alt={this.productData.description}
			// 			/>
			// 		</div>
			// 		<div className="col-6 d-flex flex-column justify-content-center">
			// 			<h4>{this.productData.productName}</h4>
			// 			<h5>{this.productData.price}</h5>
			// 			<p>{this.productData.description}</p>
			// 			<div className="d-flex flex-row align-items-center">
			// 				<button
			// 					disabled={this.state.qty === 1}
			// 					onClick={() => this.setState({ qty: this.state.qty - 1 })}
			// 					className="btn btn-danger mr-4"
			// 				>
			// 					-
			// 				</button>
			// 				{this.state.qty}
			// 				<button
			// 					onClick={() => this.setState({ qty: this.state.qty + 1 })}
			// 					className="btn btn-success mx-4"
			// 				>
			// 					+
			// 				</button>
			// 			</div>
			// 			<button className="btn btn-dark mt-3">Add to cart</button>
			// 		</div>
			// 	</div>
			// </div>
		);
	}
}

export default withRouter(ProductDetail);
