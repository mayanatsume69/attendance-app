import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import { Link } from 'react-router';

import Nav from '../components/Nav';

describe('A suite', function() {
  it('contains spec with an expectation', function() {
    expect(shallow(<Nav />).contains(
      <nav className='navbar navbar-inverse navbar-fixed-top'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <Link className='navbar-brand' to='/'>Attendance Admin</Link>
          </div>
        </div>
      </nav>
    )).to.equal(true);
  });
})
