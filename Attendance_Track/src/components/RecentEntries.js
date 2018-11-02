import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStudents } from '../reducer';
import { Table, } from 'react-bootstrap';
import { Link } from 'react-router';

@connect(
  state => ({
    students: state.students,
    isLoading: state.isLoading,
  }),
  dispatch => ({
    getStudents: () => dispatch(getStudents()),
  }),
)

export default class RecentEntries extends Component {
  componentWillMount() {
    this.props.getStudents();
  }

  render() {
    const loadingState = (
      <div className='loading-state'>
        <i className="fa fa-spinner fa-spin fa-6"></i>
        <span className="sr-only">Loading...</span>
      </div>
    )

    const allEntries = [];

    this.props.students.forEach(student => {
      let currentStudent = `${student.firstName} ${student.lastName}`;
      student.entries.forEach(entry => {
        if (entry !== undefined) {
          entry.student = {
            studentId: student.id,
            studentName: currentStudent,
          }
          allEntries.push(entry);
        }
      });
    });

    let sortedEntries = allEntries.sort((a, b) => {
      return new Date(`${b.date} ${b.time}`).getTime() - new Date(`${a.date} ${a.time}`).getTime();
    });

    let noEntriesMessage;
    let totalEntries = this.props.students.reduce((prev, next) => {
      return prev + next.entries.length;
    }, 0);
    if (totalEntries === 0) {
      noEntriesMessage = <p>No entries found. <Link to='/students'>Add entries.</Link></p>
    }


    return (
      <div>
        <h3>Recent Entries:</h3>

        {this.props.isLoading ? loadingState :
          <Table
            responsive
            className='table-bordered table-hover'>
            <thead>
              <tr className='Table-lastname'>
                <th>Time</th>
                <th>Date</th>
                <th>Student Name</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {sortedEntries.map((entry, idx) => (
                <tr key={entry.student.studentId + entry.text}>
                  <td>{entry.time}</td>
                  <td>{entry.date}</td>
                  <td>{entry.student.studentName}</td>
                  <td>{entry.text}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        }
        {noEntriesMessage}
      </div>
    )
  }
}
