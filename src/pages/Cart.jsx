import React, { Component } from "react";

export default class Cart extends Component {
	render() {
		return (
			<div className="p-5">
				<div className="row">
					<div className="col-12 text-center">
						<h1>Cart</h1>
						<table className="table mt-4">
							<thead className="thead-light">
								<tr>
									<th>Name</th>
									<th>Price</th>
									<th>Image</th>
									<th>Quantity</th>
									<th>Category</th>
									<th>Action</th>
								</tr>
							</thead>
							<tbody></tbody>
							<tfoot className="bg-light">
								<tr>
									<td colSpan={6}>
										<button className="btn btn-success">Checkout</button>
									</td>
								</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
		);
	}
}
