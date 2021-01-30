import React from 'react';
import { Link, Route, Redirect } from 'react-router-dom';

export const DefaultRoute = ({ component: Component, ...rest }) => (
       
    <Route {...rest} render={props => (
        !localStorage.getItem('UData')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/Dashboard', state: { from: props.location } }} />
    )} />
)