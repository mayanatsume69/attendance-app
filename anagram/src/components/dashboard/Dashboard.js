import React, { Component } from 'react'
import EmployeeList from '../attendance/EmployeeList'
import {connect } from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import { compose } from 'redux';

class Dashboard extends Component {
    render() {
        console.log(this.props);
        const {employees } = this.props;
        return (
            <div className="dashboard container">
                <div className="row">
                    <div className= "col s12 m6">
                        <EmployeeList employees = {employees} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        employees: state.firestore.ordered.employees
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'employees'}
    ])
)(Dashboard)