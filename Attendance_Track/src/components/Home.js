import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      myData: [],
    };
}

clickGet(e){
  e.preventDefault();
  var url = 'http://localhost:3210/data';
  axios.get(url)
  .then((takeData) => {
    console.log(takeData.data);
    this.setState({
      myData: takeData.data,
    }) 
  })
};


  render() {
    const dataPostgre = this.state.myData.map((item, index)=>{
      var myArray = ['Name: ',item.name,', Age: ', item.age, ' th.'].join(' ');
      return <p key={index}>{myArray}</p>;
    })

    return (
      <div>
      <div className='col-sm-12 home' style={{'textAlign': 'center'}}>
        <i className="fa fa-share-alt" style={{'fontSize': '120px'}}></i>
        <h3>Welcome to <strong>Attendance Admin</strong></h3>
        <p>Get started by adding some <Link to='/students'>Students</Link></p>
      </div>

      <center style={{margin:'25px'}}>
        <button className="btn btn-success" style={{margin:'15px',width:'100px'}}
        onClick={this.clickGet.bind(this)}>GET</button>
       <div>
       { dataPostgre }
       </div>
       </center>
       </div>
    )
  }
}
