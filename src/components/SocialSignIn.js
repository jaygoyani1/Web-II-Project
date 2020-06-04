import React from 'react';
import { doSocialSignIn } from '../firebase/FirebaseFunctions';
import google from '../images/google.png';

const SocialSignIn = () => {
	const socialSignOn = async (provider) => {
		try {
			await doSocialSignIn(provider);
		} catch (error) {
			alert(error);
		}
	};
	return (
		<div className="text-center">
			<p className="text-center">______________________  OR  ______________________</p>
	        <img onClick={() => socialSignOn('google')} alt='google signin' src={google} height="42" width="42"/>
		</div>
	);
};
 
export default SocialSignIn;