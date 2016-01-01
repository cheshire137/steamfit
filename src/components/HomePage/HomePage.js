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
    var authUri = Config[process.env.NODE_ENV].serverUri + '/fitbit-auth';
    return (
      <div className={s.root}>
        <div className={s.container}>
          <p>
            Sign in to Fitbit to compare<br/>
            how much you've been <em>gaming</em> with
            how much you've been <em>walking</em>.
          </p>
          <p>
            <a className={s.fitbitLink} href={authUri}>
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
