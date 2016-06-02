var React = require('react');

import Api from '../services/Api.jsx';
var iconsMap = require('../resources/icons-map.json');
import util from '../services/util.jsx';

export default class WeatherItem extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  removeElement() {
    this.props.onRemove && this.props.onRemove(this.props.name);
  }

  componentDidMount() {
  }

  prepareWeatherData(data) {
    let temp = util.kelvinToCelsius(data.main.temp);
    let pressure = util.hpaToMmhg(data.main.pressure);
    let iconClass = iconsMap[data.weather[0].icon];
    let description = data.weather[0].description;

    return {
      temperature: temp,
      pressure: pressure,
      iconClass: iconClass,
      description: description
    };
  }

  render() {
    let weather = this.prepareWeatherData(this.props.weather);
    let iconClassName = 'wi ' + weather.iconClass;

    return (
      <div className="col-md-2 col-lg-2 col-sm-2 col-xs-6 weather-item">
        <div className="weather-item-inner well">
          <h3>
            { this.props.name }
            <span className="weather-remove-button" onClick={this.removeElement.bind(this)}>⨯</span>
          </h3>
          <div>
            <div className="weather-icon" title={ weather.description }>
              <i className={iconClassName} />
            </div>
            <div>Температура: { weather.temperature } °C</div>
            <div>Давление: { weather.pressure } мм.рт.ст.</div>
          </div>
        </div>
      </div>
    );
  }
}