import React, { Component } from 'react';
import NewStudent from './NewStudent';
import StudentsTable from './StudentsTable';
import { connect } from 'react-redux';
import { getStudents, removeStudent } from '../reducer';

@connect(
  state => ({
    students: state.students,
    isLoading: state.isLoading,
  }),
  dispatch => ({
    getStudents: () => dispatch(getStudents()),
    removeStudent: (student) => dispatch(removeStudent(student)),
  }),
)

export default class Students extends Component {
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
    return (
      <div>
        <h3>Students</h3>
        <NewStudent isLoading={this.props.isLoading}/>
        {this.props.isLoading ? loadingState :
          <StudentsTable
            students={this.props.students}
            removeStudent={(e) => this.props.removeStudent(e)}
          />}
      </div>
    )
  }
}
