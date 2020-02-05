import React from 'react';
import './index.css';
import Header from '../Header';
import FilterProducts from '../FilterProducts';
class TshirtList extends React.PureComponent {
	state = {
		addedProduct: [],
		productsdata: this.props.productsdata,
		sizeSelectedForFilter: []
	};
	handleAddCart = product => {
		let isAdded = this.state.addedProduct.some(data => data.id === product.id);
		if (!isAdded) {
			this.setState({ addedProduct: [...this.state.addedProduct, product] });
		} else {
			console.log('this item is already added');
		}
	};
	handleSizeFilter = size => {
		this.setState({ sizeSelectedForFilter: [...this.state.sizeSelectedForFilter, size] });
	};
	filterProductsData(productsdata, sizeSelectedForFilter) {
		let productsDataToShow;
		if (sizeSelectedForFilter.length === 0) {
			productsDataToShow = productsdata;
		} else {
			productsDataToShow = productsdata.filter(product =>
				product.availableSizes.some(size => sizeSelectedForFilter.some(filterSize => size === filterSize))
			);
		}
		console.log(productsDataToShow);
		return productsDataToShow;
	}
	handleOrderBy = orderBy => {
		console.log(orderBy);
		let productsdata = this.state.productsdata;
		if (orderBy === 'Order By price') {
			productsdata.sort((a, b) => a.price - b.price);
		}
		if (orderBy === 'Order By name') {
			productsdata.sort((a, b) => {
				const nameA = a.title.toUpperCase();
				const nameB = b.title.toUpperCase();
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				return 0;
			});
		}
		this.setState({ productsdata: [...productsdata] });
	};
	handleRemoveCart = productToRemove => {
		const addedProduct = this.state.addedProduct.filter(product => product.id !== productToRemove.id);
		this.setState({ addedProduct: addedProduct });
	};
	render() {
		console.log(this.state);
		const { addedProduct, productsdata, sizeSelectedForFilter } = this.state;
		const productsDataToShow = this.filterProductsData(productsdata, sizeSelectedForFilter);
		return (
			<div className='tshirt-list-container'>
				<Header handleRemoveCart={this.handleRemoveCart} addedProduct={addedProduct} />
				<div className='product-list-size-filter'>
					<FilterProducts
						sizeSelectedForFilter={sizeSelectedForFilter}
						handleSizeFilter={this.handleSizeFilter}
					/>
					<div className='product-list-container'>
						<div className='products-found-order-by'>
							<div className='products-found'>{productsDataToShow.length} products found</div>
							<div className='order-by-select'>
								<div className='order-by'>Order by</div>
								<div className='select-dd'>
									<select onChange={({ target: { value } }) => this.handleOrderBy(value)}>
										<option style={{ display: 'none' }}>select</option>
										<option>Order By price</option>
										<option>Order By name</option>
									</select>
								</div>
							</div>
						</div>
						<div className='product-list'>
							{productsDataToShow.length &&
								productsDataToShow.map(product => (
									<div className='product-details-box' key={product.id}>
										<div className='img-free-text-box'>
											<img src={require(`../../../public/image${product.src_1}`)} />
											{product.isFreeShipping ? (
												<div style={{ paddingTop: '20px' }}>
													<span className='free-shopping-text'>Free shipping</span>
												</div>
											) : (
												''
											)}
										</div>
										<div className='product-title'>{product.title}</div>
										<div className='product-price'>
											{product.currencyFormat}
											{product.price}
										</div>
										<div className='add-cart-btn'>
											<button className='cart-btn' onClick={() => this.handleAddCart(product)}>
												Add to cart
											</button>
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default TshirtList;
