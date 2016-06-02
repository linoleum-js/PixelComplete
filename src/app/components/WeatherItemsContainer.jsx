var React = require('react');

import WeatherItem from './WeatherItem.jsx';
import Api from '../services/Api.jsx';
import Geolocation from '../services/Geolocation.jsx';
import LocalStorageService from '../services/LocalStorageService.jsx';
import NewCityController from './NewCityController.jsx';
var toastr = require('toastr/build/toastr.min.js');
var Promise = require('promise');

import { Link } from 'react-router';

export default class WeatherItemsContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      cityItems: [],
      showInput: false
    };
  }

  addItem(value) {
    if (!this.isUnique(value)) {
      toastr.info('Город уже добавлен');
      return;
    }

    Api.getWeatherByName(value).then((weatherData) => {
      this.state.cityItems.push({
        name: value,
        id: weatherData.id,
        weather: weatherData
      });
      this.applyData(this.state.cityItems);
    });
  }

  removeItem(cityName) {
    let list = this.state.cityItems.filter((item) => {
      return item.name.toLowerCase() !== cityName.toLowerCase();
    });

    this.applyData(list);
  }

  loadLocalData() {
    let data = LocalStorageService.getLocalData();
    let ids = data.map((item) => {
      return item.id;
    });

    Api.getWeatherByIds(ids).then((weatherData) => {
      let list = weatherData.list;
      data.forEach((item, i) => {
        item.weather = list[i];
      });

      this.setState({ cityItems: data });
    });
  }

  isUnique(cityName) {
    var cityWithName = this.state.cityItems.filter((item) => {
      return item.name.toLowerCase() === cityName.toLowerCase();
    });

    return !cityWithName.length;
  }

  loadDataByLocation() {
    Geolocation.locate().then((data) => {
      let lat = data.coords.latitude;
      let lon = data.coords.longitude;
      let nameLoaded = Api.getCityNameByLocation(lat, lon);
      // to avoid chaining get weather by lat/lon
      let weatherLoaded = Api.getWeatherByLocation(lat, lon);

      Promise.all([nameLoaded, weatherLoaded]).then((data) => {
        let weatherData = data[1];
        let cityItem = {
          name: data[0],
          weather: weatherData,
          id: weatherData.id
        };
        cityItem.weather = weatherData;
        this.applyData([cityItem]);
      });
    });
  }

  applyData(data) {
    LocalStorageService.saveLocalData(data);
    this.setState({ cityItems: data });
  }

  componentDidMount() {
    if (LocalStorageService.hasSavedData()) {
      this.loadLocalData();
    } else {
      this.loadDataByLocation();
    }
  }

  render() {
    return (
      <div className="container-fluid">
        {this.state.cityItems.map((item) => {
          return (
            <Link to={`/${item.name}`} key={item.name}>
              <WeatherItem {...item} onRemove={this.removeItem.bind(this)} />
            </Link>
          );
        })}
        <NewCityController onAdd={this.addItem.bind(this)}/>
      </div>
    );
  }
}
