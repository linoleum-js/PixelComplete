
const STORE_KEY = 'store';

export default class LocalStorageService {
  static hasSavedData() {
    return localStorage[STORE_KEY] && localStorage[STORE_KEY].length;
  }

  /**
   * @returns {Array}
   */
  static getLocalData() {
    return JSON.parse(localStorage[STORE_KEY]);
  }

  /**
   * @param {Array} data
   */
  static saveLocalData(data) {
    localStorage[STORE_KEY] = JSON.stringify(data);
  }
}