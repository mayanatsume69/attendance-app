import React, { Component } from "react";
import { connect } from "react-redux";
import { createNewStudent } from "../reducer";

@connect(
  state => ({}),
  dispatch => ({
    onCreateStudent: newStudent => {
      dispatch(createNewStudent(newStudent));
    }
  })
)
export default class NewStudent extends Component {
  render() {
    return (
      <div className="New-student">
        <form
          className="form-inline"
          onSubmit={e => {
            e.preventDefault();

            // onCreateStudent will activate the @connect above and will issue the dispatch on the ../reducer page
            this.props.onCreateStudent({
              firstName: this.refs.firstName.value,
              lastName: this.refs.lastName.value
            });
            this.refs.firstName.value = "";
            this.refs.lastName.value = "";
          }}
        >
          <div className="form-group">
            <input
              required
              ref="firstName"
              type="text"
              className="form-control"
              placeholder="First Name"
            />
            <input
              required
              ref="lastName"
              type="text"
              className="form-control"
              placeholder="Last Name"
            />
          </div>
          <button className={"btn btn-primary"} type="submit">
            Add
          </button>
        </form>
      </div>
    );
  }
}
