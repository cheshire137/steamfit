import React, { Component, PropTypes } from 'react';
import s from './FitbitPage.scss';
import SteamUsernameForm from './SteamUsernameForm';

class Steam extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  onSteamUsernameChange(username) {
    console.log(username);
  }

  render() {
    return (
      <div className={s.steam}>
        <SteamUsernameForm onChange={this.onSteamUsernameChange} />
      </div>
    );
  }
}

export default Steam;
