import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button, Modal, Header, Body, } from 'react-bootstrap';
import { addTimeEntry, removeStudent } from '../reducer';

@connect(
  state => ({}),
  dispatch => ({
    onAddEntry: (id, entry, atSchoolVal) => dispatch(addTimeEntry(id, entry, atSchoolVal)),
    onRemoveStudent: (id) => dispatch(removeStudent(id)),
  }),
)

export default class StudentsTable extends Component {
  state = {
    abcAscending: false,
    showModal: null,
    atSchoolValue: true,
  }

  changeAtSchoolVal(e) {
    const val = e.target.value;
    this.setState({
      atSchoolValue: val
    })
  }

  close() {
    this.setState({ showModal: null });
  }

  open(id) {
    this.setState({ showModal: id });
  }

  toggleAbcAscending() {
    this.setState({
      abcAscending: !this.state.abcAscending,
    });
  }

  render() {
    // FIXME: sorting students by name
    // const sortedStudents = this.state.abcAscending ?
    // this.props.students.sort((a, b) => {
    //   return a.lastName > b.lastName;
    // }) :
    // this.props.students.sort((a, b) => {
    //   return a.lastName < b.lastName;
    // });

    const students = this.props.students.map((student, idx) => (
      <tr key={student.id}>
        <td className=''>{student.atSchool ?
          <i className='fa fa-circle' aria-hidden='true' style={{color: '#13ef06', fontSize: '25px'}}></i>
            : <i className='fa fa-circle' aria-hidden='true' style={{color: '#ff0000', fontSize: '25px'}}></i>}</td>
        <td>{student.lastName}</td>
        <td>{student.firstName}</td>
        <td>{student.id}
          <Button
            bsSize='small'
            onClick={(e) => this.props.removeStudent(student.id)}
            className='btn btn-danger table-button'>x
          </Button>

          <Button
            className='table-button'
            bsStyle='primary'
            bsSize='small'
            onClick={this.open.bind(this, student.id)}
          > Add Entry
          </Button>
          <Link className={'btn btn-warning table-button'} to={`/${student.id}`}>View Log</Link>
        </td>

        <Modal
          className='entry-modal'
          animation={false}
          show={this.state.showModal === student.id}
          onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <h3>Add Time Entry for <strong><em>{student.firstName} {student.lastName}</em></strong></h3>
          </Modal.Header>
          <Modal.Body>
            <form className='form' onSubmit={ (e) => {
              e.preventDefault();
              let studentId = student.id;
              this.props.onAddEntry(
              studentId,
              {
                text: this.refs.entryText.value,
                date: this.refs.entryDate.value,
                time: this.refs.entryTimestamp.value,
              },
              this.state.atSchoolValue,
              )
            }}>
              <div className='form-group'>
                <label htmlFor="entry-text">Entry Name</label>
                <input required
                  ref='entryText'
                  type='text'
                  className='form-control'
                  placeholder='e.g. Leave for doctor appointment'
                />
                <div className="row">
                  <div className="col-xs-4">
                    <label htmlFor="entry-date">Date</label>
                    <input required
                      ref='entryDate'
                      name='entry-date'
                      type="date"
                      className='form-control'
                    />
                  </div>
                  <div className="col-xs-4">
                    <label htmlFor="entry-timestamp">Time</label>
                    <input required
                      ref='entryTimestamp'
                      name='entry-timestamp'
                      type='time'
                      className='form-control'
                    />
                  </div>
                  <div className="col-xs-4">
                    <label htmlFor="leaving-entering">Leaving/Arriving?</label>
                    <div className="radio">
                      <label>
                        <input type="radio" name="atSchoolValue" onChange={this.changeAtSchoolVal.bind(this)} value="false"/>
                        Leaving
                      </label>
                    </div>
                    <div className="radio">
                      <label>
                        <input type="radio" name="atSchoolValue" onChange={this.changeAtSchoolVal.bind(this)} value="true"/>
                        Arriving
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <button className={'btn btn-primary'} type='submit'>Add</button>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close.bind(this)}>Cancel</Button>
          </Modal.Footer>
        </Modal>

      </tr>
    ));

    return (
      <div>
        <table className='table table-bordered table-hover Students-table'>
          <thead>
            <tr className='Table-lastname'>
              <th>Here?</th>
              <th onClick={this.toggleAbcAscending.bind(this)}>Last</th>
              <th>First</th>
              <th>ID#</th>
            </tr>
          </thead>
          <tbody>
            {students}
          </tbody>
        </table>
      </div>
    );
  }
}
