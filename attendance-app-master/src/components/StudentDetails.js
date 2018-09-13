import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

@connect(
  (state, ownProps) => {
    const student =
      state.students.find(student => student.id === ownProps.params.id)
      || { name: 'Unknown student'};

    return ({
      students: state.students,
      currentStudent: student,
    })
  }
)

export default class StudentDetails extends Component {
  render() {
    return (
      <div className='student-details'>
        <h2>Student Details</h2>
        <h4>{this.props.currentStudent.firstName} {this.props.currentStudent.lastName}</h4>
        <button style={{'clear': 'both', 'display':'block'}} className='btn btn-primary'><Link style={{'color': '#fff'}} to='/students'>Students</Link></button>



        {this.props.currentStudent.entries.length ? (
          <table className='table student-details-table'>
            <thead>
              <tr>
                <th>Entries</th>
              </tr>
            </thead>
            <tbody>
              {this.props.currentStudent.entries.map((entry, idx)=> (
                <tr key={entry.text + idx}>
                  <td>{entry.time} - {entry.date} - {entry.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : 'No entries found.'}

      </div>
    );
  }
}
