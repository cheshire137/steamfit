import fetch from '../core/fetch';
import Config from '../config.json';

class Fitbit {
  static async getProfile(token) {
    return this.makeRequest(token, '/1/user/-/profile.json');
  }

  static async getActivitySinceDate(token, dateStr) {
    return this.makeRequest(token, '/1/user/-/activities/steps/date/' +
                                   'today/' + dateStr + '.json');
  }

  static async getDailyGoals(token) {
    return this.makeRequest(token, '/1/user/-/activities/goals/daily.json');
  }

  static async makeRequest(token, path) {
    const url = Config.fitbit.apiUrl + path;
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
