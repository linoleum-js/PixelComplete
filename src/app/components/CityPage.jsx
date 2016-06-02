
var React = require('react');
import Api from '../services/Api.jsx';

export default class CityPage extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    Api.getForecastByName(this.props.params.cityName).then((data) => {
      console.log(data);
    });
  }

  render() {
    return (
      <div>{this.props.params.cityName}</div>
    );
  }
}