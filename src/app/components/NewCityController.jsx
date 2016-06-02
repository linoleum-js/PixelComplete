
var React = require('react');

export default class NewCityController extends React.Component {
  constructor() {
    super();
    this.state = {
      showInput: false,
      cityName: ''
    };
  }

  clickAddNew() {
    let showing= this.state.showInput;

    this.setState({
      showInput: !showing
    }, () => {
      if (!showing) {
        this.refs['input'].focus();
      }
    });
  }

  handleKeyPress(event) {
    let value = event.target.value;
    this.setState({ cityName: value });

    // update when enter pressed
    if (event.key === 'Enter') {
      this.triggerOnAdd(value);
    }
  }

  handleChange(event) {
    this.setState({ cityName: event.target.value });
  }

  triggerOnAdd(value) {
    if (value) { this.props.onAdd && this.props.onAdd(value); }
    this.setState({ showInput: false, cityName: '' });
  }

  render() {
    return (
      <div className="col-md-2 col-lg-2 col-sm-2 col-xs-6 weather-item" title="Добавить"
           onClick={this.clickAddNew.bind(this)}>
        <div className="weather-item-inner weather-item__add">
          {this.state.showInput ?
            <input type="text" className="form-control new-city-input" value={this.state.cityName}
                   placeholder="Введите название..." onChange={this.handleChange.bind(this)}
                   onKeyPress={this.handleKeyPress.bind(this)} ref="input" />
            : <span>+</span>
          }
        </div>
      </div>
    );
  }
}