import React, { Component, PropTypes } from 'react';
import s from './FitbitPage.scss';
import cx from 'classnames';
import Link from '../Link';

class Profile extends Component {
  render() {
    var profileUri = 'https://www.fitbit.com/user/' + this.props.encodedId;
    var hasAvatar = typeof this.props.avatar === 'string' &&
        this.props.avatar.length > 0;
    var hasSteps = typeof this.props.steps === 'number';
    var hasGoalSteps = typeof this.props.goalSteps === 'number';
    var goalClass = hasSteps && hasGoalSteps &&
        this.props.steps >= this.props.goalSteps ? s.metGoal : s.notMetGoal;
    var stepGoalTitle = typeof this.props.dailyStepGoal === 'number' ?
        'Based on ' + this.props.dailyStepGoal.toLocaleString() + ' ' +
        (this.props.dailyStepGoal === 1 ? 'step' : 'steps') + ' per day' : '';
    return (
      <div className={s.profile}>
        {hasAvatar ? (
          <a href={profileUri} target="_blank" className={s.fitbitAvatarLink}>
            <img src={this.props.avatar} className={s.avatar} />
          </a>
        ) : ''}
        <div className={s.fitbitData}>
          <table>
            <thead>
              <tr>
                <th colSpan="2">
                  <a href={profileUri} target="_blank" className={s.fitbitLink}>
                    {this.props.displayName}
                  </a>
                  <Link className={s.logoutLink} data-tt="Sign out of Fitbit"
                        to="/logout">&times;</Link>
                </th>
              </tr>
            </thead>
            <tbody>
              {hasSteps ? (
                <tr className={s.steps}>
                  <th>Steps since {this.props.stepCutoffDate}:</th>
                  <td className={cx(s.stepCount, goalClass)}>
                    {this.props.steps.toLocaleString()}
                  </td>
                </tr>
              ) : (
                <tr></tr>
              )}
              {hasGoalSteps ? (
                <tr className={s.goalSteps}>
                  <th>Step goal:</th>
                  <td className={s.stepCount} data-tt={stepGoalTitle}>
                    {this.props.goalSteps.toLocaleString()}
                  </td>
                </tr>
              ) : (
                <tr></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default Profile;
