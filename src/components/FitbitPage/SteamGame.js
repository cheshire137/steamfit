import React, { Component, PropTypes } from 'react';
import s from './FitbitPage.scss';

class SteamGame extends Component {
  render() {
    return (
      <li className={s.steamGame}>
        <span className={s.gameName}>
          {this.props.game.name}
        </span> -
        <span className={s.gameMinutes}>
          {this.props.game.playtime_2weeks.toLocaleString()}
        </span>
        minutes over last 2 weeks
      </li>
    );
  }
}

export default SteamGame;
