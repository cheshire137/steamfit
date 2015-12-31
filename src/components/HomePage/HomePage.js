import React, { Component, PropTypes } from 'react';
import s from './HomePage.scss';
import withStyles from '../../decorators/withStyles';

const title = 'SteamFit';

@withStyles(s)
class HomePage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          <p>Correlate your Steam activity with your Fitbit activity.</p>
        </div>
      </div>
    );
  }

}

export default HomePage;
