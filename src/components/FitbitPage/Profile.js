import React, { Component, PropTypes } from 'react';
import s from './FitbitPage.scss';

class Profile extends Component {
  render() {
    var hasAvatar = typeof this.props.avatar === 'string' &&
        this.props.avatar.length > 0;
    return (
      <div className={s.profile}>
        <h3>{this.props.displayName}</h3>
        {hasAvatar ? (
          <img src={this.props.avatar} className={s.avatar} />
        ) : ''}
      </div>
    )
  }
}

export default Profile;
