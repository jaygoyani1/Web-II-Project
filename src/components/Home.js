import React from 'react';
import '../App.css';
import BooksList from './BooksList'
import firebase from 'firebase/app'
function Home() {
	
	return (
		<div>
			<BooksList />
		</div>
	);
}


export default Home;