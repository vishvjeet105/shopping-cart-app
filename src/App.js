import React from 'react';
import TshirtList from './components/TShirtList';
import productsdata from './productsData';
function App() {
	return (
		<div className='App'>
			<TshirtList productsdata={productsdata} />
		</div>
	);
}

export default App;
