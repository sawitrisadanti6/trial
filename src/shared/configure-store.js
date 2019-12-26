import { createBrowserHistory } from 'history'

import {createStore, applyMiddleware, compose} from 'redux'

import { routerMiddleware } from 'connected-react-router'

import thunkMiddleware from 'redux-thunk'

import {createLogger} from 'redux-logger'

import rootReducers from './root-reducer';

require('dotenv').config();

const SHOW_LOGGER = process.env.REACT_APP_SHOW_LOGGER === 'true';

const loggerMiddleware = createLogger({predicate: (getState, action) => SHOW_LOGGER});

export const history = createBrowserHistory();

export default function configureStore(initialState) {

    const enhancer = compose(

        applyMiddleware(

            thunkMiddleware,

            loggerMiddleware,

            routerMiddleware(history)

        ),

    );

    return createStore(rootReducers(history), initialState, enhancer);

}