
import Promise from 'promise';

export default class Geolocation {
  static locate() {
    return new Promise((resolve, reject) => {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(position);
        });
      }
    });
  }
}