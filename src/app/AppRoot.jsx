
var React = require('react');

import AppHeader from './components/AppHeader.jsx';
import WeatherItemsContainer from './components/WeatherItemsContainer.jsx'

export default class AppRoot extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <AppHeader />
        <WeatherItemsContainer />
      </div>
    );
  }
}