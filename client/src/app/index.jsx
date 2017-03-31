import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react'
import { render } from 'react-dom';
import {syncHistoryWithStore} from 'react-router-redux'
import {Router, Route ,IndexRoute, browserHistory} from 'react-router'
import Course from './containers/Course/Course.jsx'
import Login from './containers/login/App.jsx';
import App from './containers/App.jsx';
import Dashboard from './components/Dashboard/DashBoard.jsx';
import Department from './components/Department/Department.jsx'
import { Provider } from 'react-redux'
import store from './store.js'

const history = syncHistoryWithStore(browserHistory, store);
injectTapEventPlugin();

render((
	<Provider store={store}>
	   <Router history = {history}>
	      <Route path = "/" component = {Login}/>
	      <Route path = "/dashboard" component = {App}>
	         <IndexRoute component = {Dashboard} />	         
	         <Route path = "/department" component = {Department} />
			  <Route path="/course" component={Course}/>
			  {/*<Route path="/student" component={student}/>*/}
	      </Route>
	   </Router>
	</Provider>
), document.getElementById('app'))