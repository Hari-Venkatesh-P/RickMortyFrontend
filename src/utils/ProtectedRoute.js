// Author : Hari Venkatesh P 
// This Component is used for creating protetced routes for maintaing the auth

import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import { isTokenPresent } from './AuthUtils';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            render={props => {
                if (isTokenPresent()) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={{ pathname: '/', state: { from: props.location } }} />

                }
            }}
        />
    );
}

