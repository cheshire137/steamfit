import React, { Component, PropTypes } from 'react';
import s from './FitbitPage.scss';
import withStyles from '../../decorators/withStyles';
import LocalStorage from '../LocalStorage';

const title = 'Fitbit';

@withStyles(s)
class FitbitPage extends Component {

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
        </div>
      </div>
    );
  }

}

export default FitbitPage;
