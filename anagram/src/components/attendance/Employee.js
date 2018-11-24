import React from 'react'

const Employee = ({employee}) => {
    return (
        <div className="card z-depth-0 project-summary">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title"> {employee.firstName} {employee.presence ?
                    <i className='fa fa-circle' aria-hidden='true' style={{color: '#13ef06', fontSize: '25px'}}></i>
                    : <i className='fa fa-circle' aria-hidden='true' style={{color: '#ff0000', fontSize: '25px'}}></i> 
                    } </span>
                    <p>Posted via fingerprint scanner</p>    
                    <p className="grey-text">3rd September, 2AM</p>
                </div>
        </div>
    )
}

export default Employee