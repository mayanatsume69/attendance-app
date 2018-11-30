import React, { Component } from 'react'
import EmployeeList from '../attendance/EmployeeList'
import {connect } from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import { compose } from 'redux'
import {Redirect} from 'react-router-dom'

class Dashboard extends Component {
    render() {
        console.log(this.props);
        const {employees, auth} = this.props;
        if(!auth.uid) return <Redirect to= '/signin' />
        
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
        employees: state.firestore.ordered.employees,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection: 'employees'}
    ])
)(Dashboard)