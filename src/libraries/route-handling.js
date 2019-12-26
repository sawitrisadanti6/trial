import Storage from "./storage";
import React from "react";
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute =  ({component: Component, store: Store, ...rest}) => {

    let profile = Storage.get('profile');

    return (
        <Route
            {...rest}
            render={(props) => profile
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
        />
    )
};

const RedirectRoute = ({component: Component, store: Store, ...rest}) => {

    let profile = Storage.get('profile');

    return (
        <Route
            {...rest}
            render={(props) => profile
                ? <Redirect to={{pathname: '/', state: {from: props.location}}}/>
                : <Component {...props} />}
        />
    )
};

export { PrivateRoute, RedirectRoute };