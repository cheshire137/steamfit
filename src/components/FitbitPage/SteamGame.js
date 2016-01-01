import React, { Component, PropTypes } from 'react';
import s from './FitbitPage.scss';

class SteamGame extends Component {
  render() {
    var gameMinutes = this.props.game.playtime_2weeks;
    var gameHours = Math.floor(gameMinutes / 60);
    var gameTimeTitle = gameMinutes.toLocaleString() + ' ' +
        (gameMinutes === 1 ? 'minute' : 'minutes');
    var gameTimeStr = gameMinutes > 60 ?
        gameHours + 'h ' + (gameMinutes % 60) + 'm' : gameMinutes + 'm';
    var imgUrl = 'http://media.steampowered.com/steamcommunity/public/' +
                 'images/apps/' + this.props.game.appid + '/' +
                 this.props.game.img_icon_url + '.jpg';
    return (
      <tr className={s.steamGame}>
        <th className={s.gameIconContainer}>
          <img src={imgUrl} alt={this.props.game.name} className={s.gameIcon} />
        </th>
        <th className={s.gameName}>
          {this.props.game.name}
        </th>
        <td className={s.gameMinutes} title={gameTimeTitle}>
          {gameTimeStr}
        </td>
      </tr>
    );
  }
}

export default SteamGame;
