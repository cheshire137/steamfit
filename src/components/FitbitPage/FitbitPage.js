import React, { Component, PropTypes } from 'react';
import s from './FitbitPage.scss';
import withStyles from '../../decorators/withStyles';
import LocalStorage from '../../stores/localStorage';
import Fitbit from '../../actions/fitbit';
import Profile from './Profile';

const title = 'Fitbit';

@withStyles(s)
class FitbitPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentWillMount() {
    this.context.onSetTitle(title);
  }

  componentDidMount() {
    var token = LocalStorage.get('token');
    Fitbit.getProfile(token).then((data) => {
      this.setState({profile: data.user});
    }.bind(this))
  }

  componentDidUpdate() {
    console.log('state', this.state);
  }

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <h1>{title}</h1>
          {typeof this.state.profile === 'object' ? (
            <Profile {...this.state.profile} />
          ) : ''}
        </div>
      </div>
    );
  }

}

export default FitbitPage;
