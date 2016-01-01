import React, { Component, PropTypes } from 'react';
import s from './FitbitPage.scss';
import Steam from '../../actions/steam';
import LocalStorage from '../../stores/localStorage';

class SteamActivity extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {
    var steamId = LocalStorage.get('steamId');
    this.setState({steamId: steamId});
    if (typeof steamId === 'undefined') {
      Steam.getSteamId(this.props.username).then((data) => {
        this.saveSteamId(data.response.steamid);
      }.bind(this));
    }
  }

  saveSteamId(steamId) {
    this.setState({steamId: steamId});
    if (typeof steamId === 'string') {
      LocalStorage.set('steamId', steamId);
    } else {
      LocalStorage.delete('steamId');
    }
  }

  clearSteamUsername(event) {
    event.preventDefault();
    this.props.saveSteamUsername(undefined);
  }

  render() {
    var steamIdTitle = 'Steam ID: ' + this.state.steamId;
    return (
      <p>
        Steam user name:
        <span className={s.steamUsername} title={steamIdTitle}>
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
