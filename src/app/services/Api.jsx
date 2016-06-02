
import Promise from 'promise';
import util from './util.jsx';

const APPID = '827061100aec13448ef38a5071f935e1';
const OPEN_WEATHER_BASE_URL = 'http://api.openweathermap.org/data/2.5';
const GEOCODE_BASE_URL = 'http://maps.googleapis.com/maps/api/geocode/json';

export default class BaseApi {
  static request(url, args, method, adapter) {
    adapter = adapter || function (data) { return data; };

    return new Promise((resolve, reject) => {
      $.ajax({
        method: method,
        url: url,
        data: args
      }).done((data) => {
        if (data.cod === '404') {
          toastr.warning('Город ' + util.capitalize(args.q) + ' не найден  ');
          return;
        }
        resolve(adapter(data));
      }).fail((err) => {
        reject(err);
      });
    });
  }

  static get(url, args, adapter) {
    return this.request(url, args, 'GET', adapter);
  }

  /**
   * @param {string} cityName
   */
  static getWeatherByName(cityName) {
    return this.get(OPEN_WEATHER_BASE_URL + '/weather', {
      APPID: APPID,
      q: cityName,
      lang: 'ru'
    });
  }

  /**
   * @param {Array} ids
   * @returns {object} Promise
   */
  static getWeatherByIds(ids) {
    return this.get(OPEN_WEATHER_BASE_URL + '/group', {
      APPID: APPID,
      lang: 'ru',
      id: ids.join(',')
    });
  }

  /**
   * @param {number} lat
   * @param {number} lon
   * @returns {object} Promise
   */
  static getWeatherByLocation(lat, lon) {
    return this.get(OPEN_WEATHER_BASE_URL + '/weather', {
      APPID: APPID,
      lang: 'ru',
      lat: lat,
      lon: lon
    });
  }

  static getForecastByName(name) {
    return this.get(OPEN_WEATHER_BASE_URL + '/forecast', {
      APPID: APPID,
      lang: 'ru',
      q: name
    });
  }

  /**
   * @param {number} lat
   * @param {number} lon
   * @returns {object} Promise
   */
  static getCityNameByLocation(lat, lon) {
    return this.get(GEOCODE_BASE_URL, {
      latlng: lat + ',' + lon,
      sensor: true
    }, (data) => {
      if (data.status !== 'OK') { return ''; }

      // fetch city name
      let components = data.results[0].address_components;
      let cityData = components.filter((item) => {
        return item.types.indexOf('locality') !== -1;
      })[0];

      return cityData.long_name;
    });
  }

}