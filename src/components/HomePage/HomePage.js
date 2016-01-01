import React, { Component, PropTypes } from 'react';
import s from './HomePage.scss';
import parsePath from 'history/lib/parsePath';
import withStyles from '../../decorators/withStyles';
import Config from '../../config.json';
import LocalStorage from '../../stores/localStorage';
import Location from '../../core/Location';

const title = 'Connect with Fitbit';

@withStyles(s)
class HomePage extends Component {
  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle(title);
    var token = LocalStorage.get('token');
    if (token) {
      Location.push({
        ...(parsePath('/fitbit'))
      });
    }
  }

  render() {
    var scopes = 'activity profile';
    var authUrl = 'https://www.fitbit.com/oauth2/authorize' +
                  '?client_id=' + process.env.FITBIT_CLIENT_ID +
                  '&response_type=token' +
                  '&scope=' + encodeURIComponent(scopes) +
                  '&redirect_uri=' +
                  encodeURIComponent(Config[process.env.NODE_ENV].fitbit.redirectUri);
    return (
      <div className={s.root}>
        <div className={s.container}>
          <p>
            Sign in to Fitbit to compare<br/>
            how much you've been <em>gaming</em> with
            how much you've been <em>walking</em>.
          </p>
          <p>
            <a className={s.fitbitLink} href={authUrl}>
              <img src={require('./fitbit.png')} width="16" height="16" alt="Fitbit" />
              <span>Sign in to Fitbit</span>
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default HomePage;
