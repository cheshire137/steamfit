import React, { Component, PropTypes } from 'react';
import s from './FitbitPage.scss';
import withStyles from '../../decorators/withStyles';
import LocalStorage from '../../stores/localStorage';
import Fitbit from '../../actions/fitbit';
import Profile from './Profile';

const title = 'Your Activity';

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
    Fitbit.getProfile(token).then((data) => {
      this.setState({profile: data.user});
    }.bind(this));
    var goalsXhr = Fitbit.getDailyGoals(token);
    Fitbit.getActivitySinceDate(token,
                                this.state.stepCutoffDate).then((data) => {
      var steps = data['activities-steps'];
      goalsXhr.then((data) => {
        this.setState({goalSteps: data.goals.steps * 14,
                       steps: this.sumSteps(steps)});
      }.bind(this));
    }.bind(this));
  }

  sumSteps(steps) {
    var total = 0;
    for (var i = 0; i < steps.length; i++) {
      total = total + parseInt(steps[i].value, 10);
    }
    return total;
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <div className={s.row}>
            <div className={s.leftColumn}>
              <h2>Fitbit</h2>
              {typeof this.state.profile === 'object' ? (
                <Profile {...this.state.profile} stepCutoffDate={this.state.stepCutoffDate} steps={this.state.steps} goalSteps={this.state.goalSteps} />
              ) : ''}
            </div>
            <div className={s.rightColumn}>
              <h2>Steam</h2>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default FitbitPage;
