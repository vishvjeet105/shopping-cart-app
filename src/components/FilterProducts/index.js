import React from 'react';
import './index.css';
const sizes = ['S', 'XS', 'M', 'X', 'L', 'XL', 'XXL', 'ML'];
const FilterProducts = React.memo(function(props) {
	const { sizeSelectedForFilter, handleSizeFilter } = props;
	function isFilterClass(filteredSize, sizeSelectedForFilter) {
		return sizeSelectedForFilter.some(size => filteredSize === size);
	}
	return (
		<div className='size-filter-box'>
			<div className='filter-text'>Sizes:</div>
			<div className='filter-types-list'>
				{sizes.map((size, i) => (
					<div
						className={`size-filter-body ${
							isFilterClass(size, sizeSelectedForFilter) ? 'it-is-filtered' : ''
						}`}
						key={i + 1}
						onClick={() => handleSizeFilter(size)}
					>
						<span style={{ fontSize: '12px' }}>{size}</span>
					</div>
				))}
			</div>
		</div>
	);
});
export default FilterProducts;
