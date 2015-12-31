import React, { Component, PropTypes } from 'react';
import s from './HomePage.scss';
import withStyles from '../../decorators/withStyles';
import Config from '../config.json';

const title = 'Connect with Fitbit';

@withStyles(s)
class HomePage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  render() {
    var authUrl = 'https://www.fitbit.com/oauth2/authorize' +
                  '?client_id=' + Config.fitbit.clientId;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <p>
            <a className={s.link} href={authUrl}>
              Sign in to Fitbit
            </a>
          </p>
        </div>
      </div>
    );
  }

}

export default HomePage;
