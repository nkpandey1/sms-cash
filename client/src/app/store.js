import {createStore,combineReducers,applyMiddleware} from 'redux'
import adminReducer from './reducers/adminReducer.jsx'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import login from './reducers/loginReducer'
import departmentReducer from './reducers/departmentReducer.js'
import studentReducer from './reducers/studentReducer.jsx'
import errorReducer from './reducers/errorReducer.jsx'
import {routerReducer} from 'react-router-redux'
export default createStore(
    combineReducers({
    	login,
    	adminReducer,
    	departmentReducer,
    	errorReducer,
    	routing: routerReducer,
        studentReducer
    }),
    {},
    applyMiddleware(logger(),thunk , promise())
)

