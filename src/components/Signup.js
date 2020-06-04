import React, { useContext, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { doCreateUserWithEmailAndPassword } from '../firebase/FirebaseFunctions';
import { AuthContext } from '../firebase/Auth';
import SocialSignIn from './SocialSignIn';
import { FaUserPlus } from "react-icons/fa";

function SignUp() {
	const { currentUser } = useContext(AuthContext);
	const [ pwMatch, setPwMatch ] = useState('');
	const handleSignUp = async (e) => {
		e.preventDefault();
		const { displayName, email, passwordOne, passwordTwo } = e.target.elements;
		if (passwordOne.value !== passwordTwo.value) {
			setPwMatch('Passwords do not match');
			
			return false;
		}

		try {
			await doCreateUserWithEmailAndPassword(email.value.trim(), passwordOne.value, displayName);
		} catch (error) {
			alert(error);
		}
	};

	if (currentUser) {
		return <Redirect to='/SocialSignupDetails' />;
	}

	return (
		<div>
			<br/>
			<h1 className="text-center">SIGN UP</h1>
			<hr/>
			{pwMatch && <h4 className='error'>{pwMatch}</h4>}
			<form onSubmit={handleSignUp} className="container">
				<div className='form-group row'>
					<label className="col-sm-2 col-form-label col-form-label-sm">
						EMAIL</label>
						<input className='form-control col' required name='email' type='email' placeholder='Email' />
					
				</div>
				<div className='form-group row'>
					<label className="col-sm-2 col-form-label col-form-label-sm">
						PASSWORD</label>
						<input
							className='form-control col'
							id='passwordOne'
							name='passwordOne'
							type='password'
							placeholder='Password'
							required
						/>
					
				</div>
				<div className='form-group row'>
					<label className="col-sm-2 col-form-label col-form-label-sm">
						CONFIRM PASSWORD</label>
						<input
							className='form-control col'
							name='passwordTwo'
							type='password'
							placeholder='Confirm Password'
							required
						/>
				
				</div>
				<div className="text-center">
				<button id='submitButton' name='submitButton' type='submit' className="btn btn-success">
					<FaUserPlus/> SIGN UP
				</button>
				</div>
			</form>
			<br />
			<SocialSignIn />
		</div>
	);
}

export default SignUp;
