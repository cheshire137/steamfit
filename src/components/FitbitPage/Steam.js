import React, { Component, PropTypes } from 'react';
import s from './FitbitPage.scss';
import SteamUsernameForm from './SteamUsernameForm';

class Steam extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  onSteamUsernameChange(username) {
    if (typeof username === 'string' && username.length < 1) {
      username = undefined;
    }
    this.setState({username: username});
  }

  clearSteamUsername(event) {
    event.preventDefault();
    this.setState({username: undefined});
  }

  render() {
    var hasUsername = typeof this.state.username === 'string';
    return (
      <div className={s.steam}>
        {hasUsername ? (
          <p>
            Steam user name: {this.state.username}
            <a href="#" onClick={this.clearSteamUsername.bind(this)}>
              X
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
