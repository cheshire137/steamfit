import React, { Component, PropTypes } from 'react';
import s from './FitbitPage.scss';

class Profile extends Component {
  render() {
    var profileUri = 'https://www.fitbit.com/user/' + this.props.encodedId;
    var hasAvatar = typeof this.props.avatar === 'string' &&
        this.props.avatar.length > 0;
    return (
      <div className={s.profile}>
        <h3>
          <a href={profileUri} target="_blank" className={s.fitbitLink}>
            {this.props.displayName}
          </a>
        </h3>
        {hasAvatar ? (
          <a href={profileUri} target="_blank" className={s.fitbitLink}>
            <img src={this.props.avatar} className={s.avatar} />
          </a>
        ) : ''}
        <p className={s.steps}>
          Steps since {this.props.stepCutoffDate}:
          <span className={s.stepCount}>
            {this.props.steps.toLocaleString()}
          </span>
        </p>
      </div>
    )
  }
}

export default Profile;
