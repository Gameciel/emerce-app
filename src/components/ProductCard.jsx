import React, { Component } from "react";
import "../assets/styles/product_card.css";


export default class ProductCard extends Component {

	render() {
		return (
			<div className="card product-card">
				<img
					src={this.props.productData.productImage}
					alt={this.props.productData.description}
				/>
				<div className="mt-2">
					<div>
						<h6>{this.props.productData.productName}</h6>
						<span className="text-muted">Rp {this.props.productData.price.toLocaleString("id")}</span>
					</div>
					<div className="d-flex flex-row justify-content-end">
						<button className="btn btn-primary mt-2">Add to cart</button>
					</div>
				</div>
			</div>
		);
	}
}
