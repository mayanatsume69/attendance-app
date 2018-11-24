import authReducer from './authReducer'
import employeeReducer from './employeeReducer'
import {combineReducers} from 'redux'
import { firestoreReducer } from 'redux-firestore'

const rootReducer = combineReducers({
    auth: authReducer,
    employee: employeeReducer,
    firestore: firestoreReducer
});

export default rootReducer