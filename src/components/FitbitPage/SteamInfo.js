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
    var currentUsername = LocalStorage.get('steam');
    if (currentUsername !== username) {
      if (typeof username === 'string') {
        LocalStorage.set('steam', username);
      } else {
        LocalStorage.delete('steam');
      }
      LocalStorage.delete('steamId');
      this.setState({steamId: undefined});
      this.props.onSteamUsernameChange(username);
    }
  }

  onSteamUsernameChange(username) {
    if (typeof username === 'string' && username.length < 1) {
      username = undefined;
    }
    this.saveSteamUsername(username);
    this.props.onSteamUsernameChange(username);
  }

  render() {
    var hasUsername = typeof this.state.username === 'string';
    return (
      <div className={s.steam}>
        {hasUsername ? (
          <SteamActivity username={this.state.username}
                         saveSteamUsername={this.saveSteamUsername.bind(this)}
                         onSteamGameTimeUpdate={this.props.onSteamGameTimeUpdate} />
        ) : (
          <SteamUsernameForm onChange={this.onSteamUsernameChange.bind(this)} />
        )}
      </div>
    );
  }
}

export default SteamInfo;
