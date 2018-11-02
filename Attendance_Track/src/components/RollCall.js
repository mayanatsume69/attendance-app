import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStudents } from '../reducer';
import { toggleRollCallPresent } from '../reducer';

@connect(
  state => ({
    students: state.students,
    isLoading: state.isLoading,
  }),
  dispatch => ({
    getStudents: () => dispatch(getStudents()),
    onToggleRollCall: (id) => {
      dispatch(toggleRollCallPresent(id))
    }
  }),
)

export default class RollCall extends Component {
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
      <div style={{'text-align': 'center'}}>
        <div >
          <h3>Roll call for
            <span style={{'color': '#55afaa' }}> {new Date().toDateString()}</span>
          </h3>
          <p>Check if student arrived on time</p>
        </div>

        {this.props.isLoading ? loadingState :
          this.props.students.map((student) => (
            <div key={student.id}>
            <span className={student.rollCallPresent ? 'line-through' : 'absent'}>
              <span
                style={{'color': '#000'}}
                onClick={(e) => {
                  this.props.onToggleRollCall(student.id)
                }}>
                {student.firstName} {student.lastName}
              </span>
            </span>

            </div>
          ))
        }
      </div>
    );
  }
}
