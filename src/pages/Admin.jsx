import React, { Component } from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Swal from "sweetalert2";

class Admin extends Component {
	state = {
		productList: [],
		addProductName: "",
		addPrice: undefined,
		addProductImage: "",
		addProductDescription: "",
		addCategory: "",

		editID: 0,
		editProductName: "",
		editPrice: undefined,
		editProductImage: "",
		editProductDescription: "",
		editCategory: "",
	};

	fetchProducts = () => {
		Axios.get(`${API_URL}/products`)
			.then(res => {
				this.setState({ productList: res.data });
			})
			.catch(err => {
				console.log(err);
			});
	};

	inputHandler = event => {
		// const { name, value } = event.target;
		const name = event.target.name;
		const value = event.target.value;
		this.setState({ [name]: value });
	};

	addNewProduct = () => {
		Axios.post(`${API_URL}/products`, {
			productName: this.state.addProductName,
			price: parseInt(this.state.addPrice),
			productImage: this.state.addProductImage,
			description: this.state.addProductDescription,
			category: this.state.addCategory,
		})
			.then(res => {
				this.fetchProducts();
				this.setState({
					addProductName: "",
					addPrice: undefined,
					addProductImage: "",
					addProductDescription: "",
					addCategory: "",
				});
			})
			.catch(err => {
				console.log(err);
			});
	};

	cancelEdit = () => {
		this.setState({ editID: 0 });
	};

	saveButtonHandler = () => {
		Axios.patch(`${API_URL}/products/${this.state.editID}`, {
			productName: this.state.editProductName,
			price: parseInt(this.state.editPrice),
			productImage: this.state.editProductImage,
			description: this.state.editDescription,
			category: this.state.editCategory,
		})
			.then(res => {
				this.fetchProducts();
				this.cancelEdit();
			})
			.catch(err => console.log(err));
	};

	deleteButtonHandler = id => {
		Swal.fire({
			title: "Do you want to delete this item?",
			showCancelButton: true,
			confirmButtonText: "Delete",
		}).then(result => {
			if (result.isConfirmed) {
				Swal.fire("Deleted!", "", "success");
				Axios.delete(`${API_URL}/products/${id}`)
					.then(res => {
						this.fetchProducts();
					})
					.catch(err => {
						console.log(err);
					});
			}
		});
	};

	editToggle = data => {
		this.setState({
			editID: data.id,
			editProductName: data.productName,
			editPrice: parseInt(data.price),
			editProductImage: data.productImage,
			editProductDescription: data.description,
			editCategory: data.category,
		});
	};

	renderProducts = () => {
		return this.state.productList.map(value => {
			if (value.id === this.state.editID) {
				return (
					<tr>
						<td>{value.id}</td>
						<td>
							<input
								defaultValue={value.productName}
								type="text"
								className="form-control"
								name="editProductName"
								onChange={this.inputHandler}
							></input>
						</td>
						<td>
							<input
								defaultValue={value.price}
								type="number"
								className="form-control"
								name="editPrice"
								onChange={this.inputHandler}
							></input>
						</td>
						<td>
							<input
								defaultValue={value.productImage}
								type="text"
								className="form-control"
								name="editProductImage"
								onChange={this.inputHandler}
							></input>
						</td>
						<td>
							<input
								defaultValue={value.description}
								type="text"
								className="form-control"
								name="editDescription"
								onChange={this.inputHandler}
							></input>
						</td>
						<td>
							<select
								defaultValue={value.category}
								name="editCategory"
								className="form-control"
								onChange={this.inputHandler}
							>
								<option value="">All Item</option>
								<option value="kaos">Kaos</option>
								<option value="celana">Celana</option>
								<option value="aksesoris">Aksesoris</option>
							</select>
						</td>
						<td>
							<button
								onClick={this.saveButtonHandler}
								className="btn btn-success"
							>
								Save
							</button>
						</td>
						<td>
							<button onClick={this.cancelEdit} className="btn btn-danger">
								Cancel
							</button>
						</td>
					</tr>
				);
			} else {
				return (
					<tr>
						<td>{value.id}</td>
						<td>{value.productName}</td>
						<td>{value.price}</td>
						<td>
							<img src={value.productImage} width="125" />
						</td>
						<td>{value.description}</td>
						<td>{value.category}</td>
						<td>
							<button
								onClick={() => this.editToggle(value)}
								className="btn btn-secondary"
							>
								Edit
							</button>
						</td>
						<td>
							<button
								onClick={() => this.deleteButtonHandler(value.id)}
								className="btn btn-danger"
							>
								Delete
							</button>
						</td>
					</tr>
				);
			}
		});
	};

	componentDidMount() {
		this.fetchProducts();
	}

	render() {
		if (this.props.userGlobal.role !== "admin") {
			return <Redirect to="/" />;
		}
		return (
			<div className="p-5">
				<div className="row">
					<div className="col-12 text-center">
						<h1>Manage Products</h1>
						<table className="table mt-4">
							<thead className="thead-light">
								<tr>
									<th>ID</th>
									<th>Name</th>
									<th>Price</th>
									<th>Image</th>
									<th>Description</th>
									<th>Category</th>
									<th colSpan={2}>Action</th>
								</tr>
							</thead>
							<tbody>{this.renderProducts()}</tbody>
							<tfoot className="bg-light">
								<tr>
									<td></td>
									<td>
										<input
											value={this.state.addProductName}
											onChange={this.inputHandler}
											placeholder="Product name"
											name="addProductName"
											type="text"
											className="form-control"
										></input>
									</td>
									<td>
										<input
											value={this.state.addPrice}
											onChange={this.inputHandler}
											placeholder="Price"
											name="addPrice"
											type="number"
											className="form-control"
										></input>
									</td>
									<td>
										<input
											value={this.state.addProductImage}
											onChange={this.inputHandler}
											placeholder="Product Image"
											name="addProductImage"
											type="text"
											className="form-control"
										></input>
									</td>
									<td>
										<input
											value={this.state.addDescription}
											onChange={this.inputHandler}
											placeholder="Product Description"
											name="addDescription"
											type="text"
											className="form-control"
										></input>
									</td>
									<td>
										<select
											value={this.state.addCategory}
											onChange={this.inputHandler}
											name="addCategory"
											className="form-control"
										>
											<option value="">All Item</option>
											<option value="kaos">Kaos</option>
											<option value="celana">Celana</option>
											<option value="aksesoris">Aksesoris</option>
										</select>
									</td>
									<td colSpan={2}>
										<button
											onClick={this.addNewProduct}
											className="btn btn-info"
										>
											Add Product
										</button>
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

const mapStateToProps = state => {
	return { userGlobal: state.user };
};

export default connect(mapStateToProps)(Admin);
