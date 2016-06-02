

export default class util {
  static kelvinToCelsius(value) {
    return (value - 273).toFixed(1);
  }

  static hpaToMmhg(value) {
    return (value / 1.333).toFixed(1);
  }

  static capitalize(str) {
    if (!str) return str;

    return str[0].toUpperCase() + str.slice(1);
  }
}