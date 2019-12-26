import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router'

import * as commonReducer from './common-reducers'

const createRootReducer = (history) => combineReducers({

    ...commonReducer,

    router: connectRouter(history)

});

export default createRootReducer