import React, { Component, PropTypes } from 'react';
import s from './LogoutPage.scss';
import parsePath from 'history/lib/parsePath';
import withStyles from '../../decorators/withStyles';
import LocalStorage from '../../stores/localStorage';
import Location from '../../core/Location';

const title = 'Signing out...';

@withStyles(s)
class LogoutPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.context.onSetTitle(title);
    LocalStorage.delete('token');
    Location.push({
      ...(parsePath('/'))
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

export default LogoutPage;
