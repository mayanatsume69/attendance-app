// API functions
import { newStudent as apiCreateNewStudent } from './api/index';
import { getStudents as apiGetStudents } from './api/index';
import { removeStudent as apiRemoveStudent } from './api/index';
import { addEntry as apiAddEntry } from './api/index';
import { toggleRollCallPresent as apiToggleRollCallPresent } from './api/index';

const NEW_STUDENT_FETCH = 'app/NEW_STUDENT_FETCH'
const NEW_STUDENT_SUCCESS = 'app/NEW_STUDENT_SUCCESS'
const NEW_STUDENT_FAILURE = 'app/NEW_STUDENT_FAILURE'
const NEW_STUDENT_ALWAYS = 'app/NEW_STUDENT_ALWAYS';

const GET_STUDENTS_FETCH = 'app/GET_STUDENTS_FETCH'
const GET_STUDENTS_SUCCESS = 'app/GET_STUDENTS_SUCCESS'
const GET_STUDENTS_FAILURE = 'app/GET_STUDENTS_FAILURE'
const GET_STUDENTS_ALWAYS = 'app/GET_STUDENTS_ALWAYS';

const REMOVE_STUDENT_FETCH = 'app/REMOVE_STUDENT_FETCH'
const REMOVE_STUDENT_SUCCESS = 'app/REMOVE_STUDENT_SUCCESS'
const REMOVE_STUDENT_FAILURE = 'app/REMOVE_STUDENT_FAILURE'
const REMOVE_STUDENT_ALWAYS = 'app/REMOVE_STUDENT_ALWAYS';

const ADD_ENTRY_FETCH = 'app/ADD_ENTRY_FETCH'
const ADD_ENTRY_SUCCESS = 'app/ADD_ENTRY_SUCCESS'
const ADD_ENTRY_FAILURE = 'app/ADD_ENTRY_FAILURE'
const ADD_ENTRY_ALWAYS = 'app/ADD_ENTRY_ALWAYS';

const TOGGLE_PRESENT_FETCH = 'app/TOGGLE_PRESENT_FETCH'
const TOGGLE_PRESENT_SUCCESS = 'app/TOGGLE_PRESENT_SUCCESS'
const TOGGLE_PRESENT_FAILURE = 'app/TOGGLE_PRESENT_FAILURE'
const TOGGLE_PRESENT_ALWAYS = 'app/TOGGLE_PRESENT_ALWAYS'


const initialState = {
  students: [],
  isLoading: false,
}
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case NEW_STUDENT_FETCH:
      return {
        ...state,
        isLoading: true,
      }
    case NEW_STUDENT_SUCCESS:
      return {
        ...state,
        students: action.payload,
      };

    case NEW_STUDENT_FAILURE:
      console.error('New Student error: ', action.error);
      return state;

    case NEW_STUDENT_ALWAYS:
      return {
        ...state,
        isLoading: false,
      }

    case GET_STUDENTS_FETCH:
      return {
        ...state,
        isLoading: true,
      };

    case GET_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload,
      };

    case GET_STUDENTS_FAILURE:
      console.error('Get Student error: ', action.error);
      return state;

    case GET_STUDENTS_ALWAYS:
      return {
        ...state,
        isLoading: false,
      };

    case REMOVE_STUDENT_FETCH:
      return {
        ...state,
        isLoading: true,
      };

    case REMOVE_STUDENT_SUCCESS:
      return {
        ...state,
        students: action.payload,
      };

    case REMOVE_STUDENT_FAILURE:
      console.error('Remove student error: ', action.error);
      return state;

    case REMOVE_STUDENT_ALWAYS:
      return {
        ...state,
        isLoading: false,
      }

    case ADD_ENTRY_FETCH:
      return {
        ...state,
        isLoading: true,
      };

    case ADD_ENTRY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        students: action.payload
      };

    case ADD_ENTRY_FAILURE:
      console.error(`Add entry error:${action.error}`);
      return state;

    case ADD_ENTRY_ALWAYS:
      return {
        ...state,
        isLoading: false
      }
    case TOGGLE_PRESENT_FETCH:
      return {
        ...state,
      };
    case TOGGLE_PRESENT_SUCCESS:
      return {
        ...state,
        students: action.payload
      };
    case TOGGLE_PRESENT_FAILURE:
      console.error(`Toggle student present error: ${action.error}`);
      return state;
    case TOGGLE_PRESENT_ALWAYS:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export const createNewStudent = newStudent => async (dispatch, getState) => {
  dispatch({
    type: NEW_STUDENT_FETCH,
  });

  try {
    const createdStudent = await apiCreateNewStudent(newStudent);

    dispatch({
      type: NEW_STUDENT_SUCCESS,
      payload: createdStudent,
    });
  } catch(e) {
    dispatch({
      type: NEW_STUDENT_FAILURE,
      error: e,
    });
  }
  dispatch({
    type: NEW_STUDENT_ALWAYS,
  });
};

export const getStudents = () => async (dispatch, getState) => {
  dispatch({
    type: GET_STUDENTS_FETCH,
  });

  try {
    const students = await apiGetStudents();

    dispatch({
      type: GET_STUDENTS_SUCCESS,
      payload: students,
    });
  } catch (e) {

    dispatch({
      type: GET_STUDENTS_FAILURE,
      error: e,
    });
  }

  dispatch({
    type: GET_STUDENTS_ALWAYS,
  });
};

export const removeStudent = student => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_STUDENT_FETCH,
  });
  try {
    const students = await apiRemoveStudent(student);

    dispatch({
      type: REMOVE_STUDENT_SUCCESS,
      payload: students,
    });
  } catch (e) {

    dispatch({
      type: REMOVE_STUDENT_FAILURE,
      error: e,
    });
  }
  dispatch({
    type: REMOVE_STUDENT_ALWAYS,
  });
}

export const addTimeEntry = (id, entry, atSchool) => async (dispatch, getState) => {
  dispatch({
    type: ADD_ENTRY_FETCH,
  });
  try {
    const students = await apiAddEntry(id, entry, atSchool);

    dispatch({
      type: ADD_ENTRY_SUCCESS,
      payload: students,
    });
  } catch (e) {

    dispatch({
      type: ADD_ENTRY_FAILURE,
      error: e,
    });
  }
  dispatch({
    type: ADD_ENTRY_ALWAYS,
  });
}

export const toggleRollCallPresent = id => async (dispatch, getState) => {
  dispatch({
    type: TOGGLE_PRESENT_FETCH,
  });
  try {
    const students = await apiToggleRollCallPresent(id);

    dispatch({
      type: TOGGLE_PRESENT_SUCCESS,
      payload: students,
    });
  } catch (e) {

    dispatch({
      type: TOGGLE_PRESENT_FAILURE,
      error: e,
    });
  }
  dispatch({
    type: TOGGLE_PRESENT_ALWAYS
  });
}
