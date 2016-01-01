import React, { Component, PropTypes } from 'react';
import s from './FitbitPage.scss';
import SteamUsernameForm from './SteamUsernameForm';
import SteamActivity from './SteamActivity';
import LocalStorage from '../../stores/localStorage';

class SteamInfo extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {
    this.setState({username: LocalStorage.get('steam')});
  }

  saveSteamUsername(username) {
    this.setState({username: username});
    if (typeof username === 'string') {
      LocalStorage.set('steam', username);
    } else {
      LocalStorage.delete('steam');
    }
  }

  onSteamUsernameChange(username) {
    if (typeof username === 'string' && username.length < 1) {
      username = undefined;
    }
    this.saveSteamUsername(username);
  }

  render() {
    var hasUsername = typeof this.state.username === 'string';
    return (
      <div className={s.steam}>
        {hasUsername ? (
          <SteamActivity username={this.state.username} saveSteamUsername={this.saveSteamUsername.bind(this)} />
        ) : (
          <SteamUsernameForm onChange={this.onSteamUsernameChange.bind(this)} />
        )}
      </div>
    );
  }
}

export default SteamInfo;
