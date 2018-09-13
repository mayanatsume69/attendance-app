import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Home extends Component {
  render() {
    return (
      <div className='col-sm-12 home' style={{'textAlign': 'center'}}>
        <i className="fa fa-share-alt" style={{'fontSize': '120px'}}></i>
        <h3>Welcome to <strong>Attendance Admin</strong></h3>
        <p>Get started by adding some <Link to='/students'>Students</Link></p>
      </div>
    )
  }
}
