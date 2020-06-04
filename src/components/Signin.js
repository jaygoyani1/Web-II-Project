import React, { useContext } from 'react';
import SocialSignIn from './SocialSignIn';
import { Redirect } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import { doSignInWithEmailAndPassword, doPasswordReset } from '../firebase/FirebaseFunctions';
import { FaSignInAlt } from "react-icons/fa";


function SignIn() {
	const { currentUser } = useContext(AuthContext);
	const handleLogin = async (event) => {
		event.preventDefault();
		let { email, password } = event.target.elements;

		try {
			await doSignInWithEmailAndPassword(email.value, password.value);
		} catch (error) {
			alert(error);
		}
	};

	const passwordReset = (event) => {
		event.preventDefault();
		let email = document.getElementById('email').value;
		if (email) {
			doPasswordReset(email);
			alert('Password reset email was sent');
		} else {
			alert('Please enter an email address below before you click the forgot password link');
		}
	};
	if (currentUser) {
		return <Redirect to='/SocialSigninDetails' />;
	}
	return (
		<div className="container">
			<br/>
			<h1 className="text-center">LOG IN</h1>
			<hr/>
			<br/>
			<form onSubmit={handleLogin}>
				<div className='form-group row'>
					<label className="col-sm-2 col-form-label col-form-label-sm">
						EMAIL
						</label>
						<input
							className='form-control col'
							name='email'
							id='email'
							type='email'
							placeholder='Email'
							required
						/>
					
				</div>
				<div className='form-group row'>
				<label className="col-sm-2 col-form-label col-form-label-sm">
						PASSWORD
						</label>
						<input
							className='form-control col'
							name='password'
							type='password'
							placeholder='Password'
							required
						/>
					
				</div>
				<br/>
				<div className="row ">
				<div className="col text-center">
				<button className="btn btn-success" type='submit'> <FaSignInAlt/> LOG IN</button>
				</div>
			
				</div>
			</form>

			<br />
			<hr/>
			<div className="text-center">
			<SocialSignIn />
			</div>
		</div>
	);
}

export default SignIn;