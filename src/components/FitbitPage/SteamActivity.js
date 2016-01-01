import React, { Component, PropTypes } from 'react';
import s from './FitbitPage.scss';
import Steam from '../../actions/steam';

class SteamActivity extends Component {
  componentDidMount() {
    Steam.getSteamId(this.props.username).then((data) => {
      console.log('steam data', data);
    });
  }

  clearSteamUsername(event) {
    event.preventDefault();
    this.props.saveSteamUsername(undefined);
  }

  render() {
    return (
      <p>
        Steam user name:
        <span className={s.steamUsername}>
          {this.props.username}
        </span>
        <a href="#" className={s.clearSteamUsername} onClick={this.clearSteamUsername.bind(this)}>
          &times;
        </a>
      </p>
    );
  }
}

export default SteamActivity;
