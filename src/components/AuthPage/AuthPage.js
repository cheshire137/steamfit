import React, { Component, PropTypes } from 'react';
import s from './AuthPage.scss';
import parsePath from 'history/lib/parsePath';
import withStyles from '../../decorators/withStyles';
import QueryString from '../QueryString';
import LocalStorage from '../../stores/localStorage';
import Location from '../../core/Location';

const title = 'Authenticating...';

@withStyles(s)
class AuthPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle(title);
    LocalStorage.set('token', QueryString.access_token);
    Location.push({
      ...(parsePath('/fitbit'))
    });
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
        </div>
      </div>
    );
  }

}

export default AuthPage;
