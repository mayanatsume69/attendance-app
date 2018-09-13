mport React, { Component } from 'react';
import { Link } from 'react-router';

export default class SideBar extends Component {
  render() {
    return (
      <div className='w3-sidebar'>
        <ul className='nav nav-sidebar'>
          <li><Link to='/students'>&nbsp; &nbsp; &nbsp;Students &nbsp; &nbsp; &nbsp; &nbsp;</Link></li>
          <li><Link to='/recent'>Recent Entries &nbsp; &nbsp; &nbsp; &nbsp;</Link></li>
          <li><Link to='/data'>Data &nbsp; &nbsp; &nbsp; &nbsp;</Link></li>
          <li><Link to='/rollcall'>Roll Call &nbsp; &nbsp; &nbsp; &nbsp;</Link></li>
        </ul>
      </div>
    )
  }
}