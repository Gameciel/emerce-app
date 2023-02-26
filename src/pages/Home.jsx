import React, { Component } from "react";
import ProductCard from "../components/ProductCard";
import Axios from 'axios';
import {API_URL} from '../constants/API.js'

export default class home extends Component {

	state = {
		productList: [],
		filteredProductLists: [],
		page: 1,
		maxPage: 0,
		itemPerPage: 6,
		searchProductName: "",
		searchCategory: "",
	};

	fetchProducts = () => {
		Axios.get(`${API_URL}/products`)
		.then(res => this.setState({productList: res.data, filteredProductLists: res.data ,maxPage: Math.ceil(res.data.length / this.state.itemPerPage)}))
		.catch(err => console.log(err));
	}

	renderProducts = () => {
		const beginningIndex = (this.state.page - 1) * this.state.itemPerPage
		const currentData = this.state.filteredProductLists.slice(beginningIndex, beginningIndex + this.state.itemPerPage);
		return currentData.map(val => {
			return <ProductCard productData={val}/>;
		})
	}

	componentDidMount() {
		this.fetchProducts();
	};

	searchInputHandler = (event) => {
		const name = event.target.name;
		const value = event.target.value;

		this.setState( {[name]: value} );
	}

	searchBtnHandler = () => {
		const filteredProductLists = this.state.productList.filter( val => {
			return val.productName.toLowerCase().includes(this.state.searchProductName.toLowerCase()) && val.category.toLowerCase().includes(this.state.searchCategory.toLowerCase());
		})

		this.setState({filteredProductLists, page: 1, maxPage: Math.ceil(filteredProductLists.length / this.state.itemPerPage)});
	}

	nextPageHandler = () => {
		if (this.state.page < this.state.maxPage) this.setState({ page: this.state.page + 1 });
	}

	prevPageHandler = () => {
		if (this.state.page > 1) this.setState({page: this.state.page - 1})
	}

	render() {
		return (
			<div className="container mt-5">
				<div className="row">
					<div className="col-3">
						<div className="card">
							<div className="card-header">
								<strong>Filter Products</strong>
							</div>
							<div className="card-body">
								<label htmlFor="searchProductName">Product Name</label>
								<input
									onChange={this.searchInputHandler}
									name="searchProductName"
									type="text"
									className="form-control mb-3"
								/>
								<label htmlFor="searchCategory">Product Category</label>
								<select onChange={this.searchInputHandler} name="searchCategory" className="form-control">
									<option value="">All Items</option>
									<option value="kaos">Kaos</option>
									<option value="celana">Celana</option>
									<option value="aksesoris">Aksesoris</option>
								</select>
								<button onClick={this.searchBtnHandler} className="btn btn-primary mt-3">Search</button>
							</div>
						</div>
						<div className="card mt-4">
							<div className="card-header">
								<strong>Sort Products</strong>
							</div>
							<div className="card-body">
								<label htmlFor="sortBy">Sort by</label>
								<select name="sortBy" className="form-control">
									<option value="">Default</option>
									<option value="">Lowest Price</option>
									<option value="">Highest Price</option>
									<option value="">A-Z</option>
									<option value="">Z-A</option>
								</select>
							</div>
						</div>
						<div className="mt-3">
							<div className="d-flex flex-row justify-content-between align-items-center">
								<button disabled={this.state.page === 1} onClick={this.prevPageHandler} className="btn btn-dark">
									{"<"}
								</button>
								<div className="text-center">
									Page {this.state.page} of {this.state.maxPage}
								</div>
								<button disabled={this.state.page === this.state.maxPage} onClick={this.nextPageHandler} className="btn btn-dark">
									{">"}
								</button>
							</div>
						</div>
					</div>
					<div className="col-9">
						<div className="d-flex flex-wrap flex-row">
							{this.renderProducts()}
						</div>
					</div>
				</div>
			</div>
		);
	}
}
