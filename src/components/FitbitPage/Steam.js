import React, { Component, PropTypes } from 'react';
import s from './FitbitPage.scss';
import SteamUsernameForm from './SteamUsernameForm';
import LocalStorage from '../../stores/localStorage';

class Steam extends Component {
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

  clearSteamUsername(event) {
    event.preventDefault();
    this.saveSteamUsername(undefined);
  }

  render() {
    var hasUsername = typeof this.state.username === 'string';
    return (
      <div className={s.steam}>
        {hasUsername ? (
          <p>
            Steam user name:
            <span className={s.steamUsername}>
              {this.state.username}
            </span>
            <a href="#" className={s.clearSteamUsername} onClick={this.clearSteamUsername.bind(this)}>
              &times;
            </a>
          </p>
        ) : (
          <SteamUsernameForm onChange={this.onSteamUsernameChange.bind(this)} />
        )}
      </div>
    );
  }
}

export default Steam;
