var React = require('react');

export default class AppHeader extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <header className="header navbar navbar-default">
        <div className="nav navbar-nav">
          <div className="navbar-header">
            <a href="/" className="navbar-brand">Weather info</a>
          </div>
        </div>
      </header>
    );
  }
}