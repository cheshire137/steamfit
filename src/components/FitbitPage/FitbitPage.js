import React, { Component, PropTypes } from 'react';
import s from './FitbitPage.scss';
import cx from 'classnames';
import withStyles from '../../decorators/withStyles';
import LocalStorage from '../../stores/localStorage';
import Fitbit from '../../actions/fitbit';
import Profile from './Profile';
import SteamInfo from './SteamInfo';
import parsePath from 'history/lib/parsePath';
import Location from '../../core/Location';

const title = 'Your Activity over the Last 2 Weeks';

@withStyles(s)
class FitbitPage extends Component {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      stepCutoffDate: this.getTwoWeeksAgo()
    };
  }

  getTwoWeeksAgo() {
    var today = new Date();
    var twoWeeksInMs = 60 * 60 * 24 * 7 * 2 * 1000;
    var date = new Date(today.getTime() - twoWeeksInMs);
    date.setHours(0, 0, 0, 0);
    var month = date.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    var day = date.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    return date.getFullYear() + '-' + month + '-' + day;
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  componentDidMount() {
    var token = LocalStorage.get('token');
    Fitbit.getProfile(token).
           then(this.onFitbitProfileFetch.bind(this, token)).
           then(undefined, this.onFitbitProfileError.bind(this));
  }

  onFitbitActivityFetch(goalsXhr, data) {
    const steps = data['activities-steps'];
    goalsXhr.then(this.onFitbitGoalsFetch.bind(this, steps)).
             then(undefined, this.onFitbitGoalsError.bind(this));
  }

  onFitbitActivityError(err) {
    console.error('failed to load Fitbit activity', err);
  }

  onFitbitGoalsFetch(steps, data) {
    if (!data.goals) {
      console.error('could not get Fitbit goals from response', data);
      return;
    }
    var dailyStepGoal = data.goals.steps;
    this.setState({goalSteps: dailyStepGoal * 14,
                   steps: this.sumSteps(steps),
                   dailyStepGoal: dailyStepGoal});
  }

  onFitbitGoalsError(err) {
    console.error('failed to load Fitbit goals', err);
  }

  onFitbitProfileFetch(token, data) {
    this.setState({profile: data.user});
    const goalsXhr = Fitbit.getDailyGoals(token);
    Fitbit.getActivitySinceDate(token, this.state.stepCutoffDate).
           then(this.onFitbitActivityFetch.bind(this, goalsXhr)).
           then(undefined, this.onFitbitActivityError.bind(this));
  }

  onFitbitProfileError(err) {
    console.error('failed to load Fitbit profile', err);
    LocalStorage.delete('token');
    Location.push({
      ...(parsePath('/'))
    });
  }

  sumSteps(steps) {
    var total = 0;
    for (var i = 0; i < steps.length; i++) {
      total = total + parseInt(steps[i].value, 10);
    }
    return total;
  }

  onSteamGameTimeUpdate(totalMinutes) {
    this.setState({totalGameMinutes: totalMinutes});
  }

  onSteamUsernameChange(username) {
    this.setState({totalGameMinutes: undefined});
  }

  render() {
    var haveProfile = typeof this.state.profile === 'object';
    var haveGoals = typeof this.state.goalSteps === 'number' &&
                    typeof this.state.steps === 'number';
    var haveGameMinutes = typeof this.state.totalGameMinutes === 'number';
    var metGoal = haveGoals && this.state.steps >= this.state.goalSteps;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          {haveGoals && haveGameMinutes ? (
            <p className={cx(s.alert, metGoal ? s.alertSuccess : s.alertDanger)}>
              {metGoal ? this.state.totalGameMinutes > 0 ? (
                <span>Keep on gaming, you met your step goal!</span>
              ) : (
                <span>You didn't game at all, go play something!</span>
              ) : this.state.totalGameMinutes > 0 ? (
                <span>You should walk more and game less. :(</span>
              ) : (
                <span>You should walk more. :(</span>
              )}
            </p>
          ) : ''}
          <div className={s.row}>
            <div className={s.leftColumn}>
              <h2>
                <img className={s.fitbitLogo} src={require('../HomePage/fitbit.png')} width="16" height="16" alt="Fitbit" />
                Fitbit
              </h2>
              {haveProfile ? (
                <Profile {...this.state.profile}
                         stepCutoffDate={this.state.stepCutoffDate}
                         steps={this.state.steps}
                         goalSteps={this.state.goalSteps}
                         dailyStepGoal={this.state.dailyStepGoal} />
              ) : ''}
            </div>
            <div className={s.rightColumn}>
              <h2>
                <img className={s.steamLogo} src={require('./steam.png')} width="16" height="16" alt="Steam" />
                Steam
              </h2>
              <SteamInfo onSteamUsernameChange={this.onSteamUsernameChange.bind(this)} onSteamGameTimeUpdate={this.onSteamGameTimeUpdate.bind(this)} />
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default FitbitPage;
