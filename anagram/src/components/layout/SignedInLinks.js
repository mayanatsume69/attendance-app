import React from 'react'
import { NavLink} from 'react-router-dom'

const SignedInLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to='/signup'> Log Out</NavLink> </li>
            <li><NavLink to='/signin' className='btn btn-floating teal lighten-1'> NN </NavLink> </li>
        </ul>
            

    )
}

export default SignedInLinks