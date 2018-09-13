import React, { Component } from 'react';
import { RadialChart } from 'react-vis';
import { connect } from 'react-redux';
import { getStudents } from '../reducer';

@connect(
  state => ({
    students: state.students,
    isLoading: state.isLoading,
  }),
  dispatch => ({
    getStudents: () => dispatch(getStudents()),
  }),
)
export default class Data extends Component {
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

    const studentAttendanceValues = this.props.students
      .map((student) => {
        return student.atSchool ? 1 : 0;
      });
    const presentStudents = studentAttendanceValues.reduce((p, c) => {
      return p + c;
    }, 0);

    const absentStudents = studentAttendanceValues.length - presentStudents;

    return (
      <div className='row'>
        {this.props.isLoading ? loadingState :
          <div className="col-xs-10">
            <h3>Attendance</h3>
            <div className="row">
              <div className="col-xs-6">
                <RadialChart
                  data={[
                    { angle: presentStudents },
                    { angle: absentStudents },
                  ]}
                  width={350}
                  height={350} />
              </div>
              <div className="col-xs-6">
                <div>
                  <div className="rv-discrete-color-legend-item vertical">
                    <span className="rv-discrete-color-legend-item__color" style={{background: '#12939A', padding: '10px'}}></span>
                    <span className="rv-discrete-color-legend-item__title">Present</span>
                  </div>
                  <div className="rv-discrete-color-legend-item vertical">
                    <span className="rv-discrete-color-legend-item__color" style={{background: 'rgb(121, 199, 227)', padding: '10px'}}></span>
                    <span className="rv-discrete-color-legend-item__title">Absent</span>
                  </div>
                </div>
              </div>
            </div>

            <p>Present: { presentStudents }</p>
            <p>Absent: { absentStudents }</p>
          </div>}
      </div>
    )
  }
}
