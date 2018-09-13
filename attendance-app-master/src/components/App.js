import React, { Component } from 'react';
import Nav from './Nav';
import SideBar from './SideBar';
import '../App.css';

class App extends Component {
  render() {
    return (
      <div className="App">

        <Nav />

        <div className='container-fluid App-container'>
          <div className='row'>

            <SideBar />
            <div className='col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main'>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
