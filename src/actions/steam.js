import fetch from '../core/fetch';
import Config from '../config.json';

class Steam {
  static async getSteamId(username) {
    return this.makeRequest('/ISteamUser/ResolveVanityURL/v0001/' +
                            '?vanityurl=' + username);
  }

  static async getRecentlyPlayedGames(steamId) {
    return this.makeRequest('/IPlayerService/GetRecentlyPlayedGames/' +
                            'v0001/?steamid=' + steamId);
  }

  static async makeRequest(path) {
    const url = Config.steam.apiUri + path +
                (path.indexOf('?') > -1 ? '&' : '?') +
                'key=' + Config.steam.webApiKey +
                '&format=json';
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
}

export default Steam;
