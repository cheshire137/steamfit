import React, { Component, PropTypes } from 'react';
import s from './FitbitPage.scss';
import Steam from '../../actions/steam';
import LocalStorage from '../../stores/localStorage';
import SteamGame from './SteamGame';

class SteamActivity extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {
    var steamId = LocalStorage.get('steamId');
    this.setState({steamId: steamId});
    if (typeof steamId === 'undefined') {
      Steam.getSteamId(this.props.username).
            then(this.onSteamIdFetched.bind(this));
    } else {
      this.loadRecentlyPlayed(steamId);
    }
  }

  onSteamIdFetched(data) {
    var steamId = data.response.steamid;
    this.saveSteamId(steamId);
    this.loadRecentlyPlayed(steamId);
  }

  loadRecentlyPlayed(steamId) {
    Steam.getRecentlyPlayedGames(steamId).then((data) => {
      var games = data.response.games;
      var totalMinutes = 0;
      for (var i = 0; i < games.length; i++) {
        totalMinutes = totalMinutes + games[i].playtime_2weeks;
      }
      this.setState({games: games, totalGameMinutes: totalMinutes});
    }.bind(this));
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
    var hasGames = typeof this.state.games === 'object';
    var totalGameMinutes = this.state.totalGameMinutes || 0;
    var totalGameHours = Math.floor(totalGameMinutes / 60);
    var totalTimeTitle = totalGameMinutes.toLocaleString() + ' ' +
        (totalGameMinutes === 1 ? 'minute' : 'minutes');
    var totalTimeStr = totalGameMinutes > 60 ? totalGameHours + 'h ' +
        (totalGameMinutes % 60) + 'm' : totalTimeTitle;
    var profileUrl = 'https://steamcommunity.com/id/' +
                     this.props.username + '/';
    return (
      <div className={s.steamActivity}>
        <table>
          <thead>
            <tr>
              <th colSpan="2">
                <a href={profileUrl} target="_blank"
                   className={s.steamUsername} title={steamIdTitle}>
                  {this.props.username}
                </a>
                <a href="#" className={s.clearSteamUsername}
                            onClick={this.clearSteamUsername.bind(this)}
                            title="Choose another Steam user">
                  &times;
                </a>
              </th>
            </tr>
          </thead>
          <tbody>
            {hasGames ? (
              <tr className={s.steamGameActivity}>
                <th>Total time:</th>
                <td className={s.totalGameTime}>
                  <span title={totalTimeTitle}>
                    {totalTimeStr}
                  </span>
                </td>
              </tr>
            ) : (
              <tr></tr>
            )}
            {hasGames ? (
              <tr>
                <th>Breakdown:</th>
                <td className={s.tableContainer}>
                  <table className={s.steamGames}>
                    <tbody>
                      {this.state.games.map((game) => {
                        return <SteamGame key={game.appid} game={game}
                                          totalGameMinutes={totalGameMinutes} />;
                      })}
                    </tbody>
                  </table>
                </td>
              </tr>
            ) : (
              <tr></tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default SteamActivity;
