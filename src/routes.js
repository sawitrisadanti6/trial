import React from 'react'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './shared/configure-store'
import Dashboard from "./components/container/dashboard"
import Login from "./components/container/login"
import NotFound from "./components/container/not-found"
import { PrivateRoute, RedirectRoute } from './libraries/route-handling'

const Routes = ({store}) => (

    <Provider store={store}>

        <ConnectedRouter history={history}>

            {

                <Switch>

                    <RedirectRoute exact path="/login" component={Login}/>

                    <PrivateRoute path="/" component={Dashboard}/>

                    <Route component={NotFound}/>

                </Switch>

            }

        </ConnectedRouter>

    </Provider>

);

export default Routes;