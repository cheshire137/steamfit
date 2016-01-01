import React, { Component, PropTypes } from 'react';
import _ from 'underscore';
import s from './FitbitPage.scss';

class SteamUsernameForm extends Component {
  constructor(props, context) {
    super(props, context);
    this.onInputChange = _.debounce(this.onInputChange.bind(this), 2000);
  }

  onFormSubmit(event) {
    event.preventDefault();
    // TODO: get input value, pass to onChange
    // this.props.onChange();
  }

  onInputChange(event) {
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <form className={s.steamUsernameForm} onSubmit={this.onFormSubmit.bind(this)}>
        <label htmlFor="steam-username">
          Your Steam user name:
        </label>
        <input type="text" id="steam-username" autofocus="autofocus" placeholder="e.g., cheshire137" onChange={this.onInputChange} />
        <p className={s.helpBlock}>
          Your Steam profile must be public.
        </p>
      </form>
    );
  }
}

export default SteamUsernameForm;
