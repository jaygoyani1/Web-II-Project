import React from 'react';
import { doSignOut } from '../firebase/FirebaseFunctions';
import Button from 'react-bootstrap/Button'

const SignOutButton = () => {
	return (
		<Button variant="outline-light" size="sm" onClick={doSignOut}>
			SIGN OUT
		</Button>
	);
};

export default SignOutButton;