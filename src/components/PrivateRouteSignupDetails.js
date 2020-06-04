import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../firebase/Auth';
import flag from './Signup'

const PrivateRouteSignupDetails = ({ component: RouteComponent, ...rest }) => {
	const { currentUser } = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(routeProps) => (!!currentUser && flag=="true" ? <RouteComponent {...routeProps} /> : <Redirect to={'home'} />)}
		/>
	);
};

export default PrivateRouteSignupDetails;