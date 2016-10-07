import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import Main from './app/main.jsx';

ReactDOM.render((
	<Router history={browserHistory}>
		<Route path="/" component={Main} />
	</Router>
), document.querySelector('#app'));