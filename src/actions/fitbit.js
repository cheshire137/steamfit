import fetch from '../core/fetch';
import Config from '../config.json';

class Fitbit {
  static async getProfile(token) {
    const url = Config.fitbit.apiUrl + '/1/user/-/profile.json';
    const response = await fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    const data = await response.json();
    return data;
  }
}

export default Fitbit;
