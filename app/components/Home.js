import React from 'react'
import { Link } from 'react-router'
import MainContainer from './MainContainer'

function Home() {
	return (
		<MainContainer>
			<h1>Github Battle</h1>
			<p className='lead'>Also known as a popularity contest.</p>
			<Link to='/playerOne'>
				<button type='button' className='btn btn-lg btn-success'>Get Started</button>
			</Link>
		</MainContainer>
	)
}

export default Home