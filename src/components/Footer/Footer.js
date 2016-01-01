/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Component } from 'react';
import s from './Footer.scss';
import withStyles from '../../decorators/withStyles';
import Link from '../Link';

@withStyles(s)
class Footer extends Component {
  render() {
    return (
      <footer className={s.root}>
        <div className={s.container}>
          <span className={s.text}>&copy; 2016 Sarah Vessels</span>
          <a className={s.link} href="https://github.com/cheshire137/steamfit"
             target="_blank">
            View source
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
