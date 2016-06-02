var React = require('react');
var ReactDOM = require('react-dom');
import { Router, Route, browserHistory } from 'react-router';
import CityPage from './app/components/CityPage.jsx';

require('imports?$=jquery!jquery/dist/jquery.js');
require('bootstrap/dist/js/bootstrap.js');

import AppRoot from './app/AppRoot.jsx';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/:cityName' component={CityPage} />
    <Route path='/' component={AppRoot} />
  </Router>,
  document.getElementById('container')
);
