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
    const url = Config[process.env.NODE_ENV].fitbit.apiUri + path;
    const response = await fetch(url, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });
    if (response.status >= 200 && response.status < 300) {
      const data = await response.json();
      return data;
    }
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

export default Fitbit;
