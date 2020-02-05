import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import './index.css';
const Header = React.memo(function(props) {
	const { addedProduct, handleRemoveCart } = props;
	let subtotalAmount = 0;
	return (
		<div className='header'>
			<div className='header-title'>Shopping Application</div>
			<div className='icon'>
				<div className='cart-icon-normal-hover'>
					<div className='icon-wrapper'>
						<FontAwesomeIcon icon={faShoppingCart} size='lg' style={{ width: '2.225em' }} />
						<span className='cart-count'>
							<span>{addedProduct.length ? addedProduct.length : 0}</span>
						</span>
					</div>
					<div className='carted-item-list-dd'>
						<div className='carted-icon-count-box'>
							<div className='carted-icon-count'>
								<FontAwesomeIcon
									icon={faShoppingCart}
									size='lg'
									style={{ width: '2.225em', color: '#fff' }}
								/>
								<span className='carted-count'>
									<span>{addedProduct.length ? addedProduct.length : 0}</span>
								</span>
							</div>
							<div className='cart-text'>
								<span style={{ color: '#fff' }}>Cart</span>
							</div>
						</div>
						{addedProduct.length ? (
							addedProduct.map(product => {
								subtotalAmount += product.price;
								return (
									<div className='carted-item'>
										<div className='carted-item-img'>
											<img src={require(`../../../public/image${product.src_2}`)} />
										</div>
										<div className='carted-item-detail'>
											<span style={{ color: '#fff' }}>{product.title}</span>
											<span style={{ color: '#fff' }}>Quantity: 1</span>
										</div>
										<div className='carted-item-price-close'>
											<div style={{ height: '40%' }}>
												<FontAwesomeIcon
													icon={faTimes}
													size='lg'
													onClick={() => handleRemoveCart(product)}
												/>
											</div>
											<div>
												<span style={{ color: 'yellow' }}>
													{product.currencyFormat}
													{product.price}
												</span>
											</div>
										</div>
									</div>
								);
							})
						) : (
							<div className='carted-item'>There is No Item To Checkout</div>
						)}
						<div className='subtotal-checkout-box'>
							<div className='subtotal-amount'>
								<span>SUBTOTAL</span>
								<span style={{ color: 'yellow' }}>${subtotalAmount}</span>
							</div>
							<div className='checkout' style={{ width: '100%' }}>
								<button className='checkout-btn'>CHECKOUT</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});

export default Header;
