import React, { Component, useEffect, useState } from "react";
import Axios from "axios";
import { API_URL } from "../constants/API";
import { useParams } from "react-router-dom";

export default function ProductDetail(props) {
	let { id } = useParams();

	const [productData, setProductData] = useState({});
	const [productStatus, setProductStatus] = useState(false);
	const [loading, setLoading] = useState(true);
	const [qty, setQty] = useState(1);

	const addToCartHandler = () => {
		Axios.get(`${API_URL}/carts`, {
			params: {
				userId: props.data,
				productId: id,
			},
		}).then(res => {
			if (res.data.length) {
				Axios.patch(`${API_URL}/carts/${res.data[0].id}`, {
					quantity: res.data[0].quantity + qty,
				})
					.then(res => {
						console.log(`patch success: ${res}`);
					})
					.catch(err => {
						console.log(`patch err: ${err}`);
					});
			} else {
				Axios.post(`${API_URL}/carts`, {
					userId: props.data,
					productId: id,
					price: productData.price,
					productName: productData.productName,
					productImage: productData.image,
					quantity: qty,
				})
					.then(res => {
						console.log(`post success: ${res}`);
					})
					.catch(err => {
						console.log(`post error: ${err}`);
					});
			}
		});
	};

	useEffect(() => {
		setLoading(true);
		Axios.get(`${API_URL}/products`, {
			params: {
				id: id,
			},
		})
			.then(res => {
				if (loading) {
					setProductData(res.data[0]);
					setProductStatus(true);
				}
				setLoading(false);
			})
			.catch(err => {
				alert(err);
			});

		return () => {
			setLoading(false);
		};
	}, []);

	return !loading && props.data ? (
		<div className="container">
			{productStatus ? (
				<div className="row mt-3">
					<div className="col-6">
						<img
							style={{ width: "100%" }}
							src={productData.productImage}
							alt={productData.description}
						/>
					</div>
					<div className="col-6 d-flex flex-column justify-content-center">
						<h4>{productData.productName}</h4>
						<h5>{productData.price}</h5>
						<p>{productData.description}</p>
						<div className="d-flex flex-row align-items-center">
							<button
								disabled={qty === 1}
								onClick={() => setQty(prev => prev - 1)}
								className="btn btn-danger mr-4"
							>
								-
							</button>
							{qty}
							<button
								onClick={() => setQty(prev => prev + 1)}
								className="btn btn-success mx-4"
							>
								+
							</button>
						</div>
						<button
							onClick={() => addToCartHandler()}
							className="btn btn-dark mt-3"
						>
							Add to cart
						</button>
					</div>
				</div>
			) : (
				<div className="alert alert-warning mt-3">Not Found</div>
			)}
		</div>
	) : null;
}
