import * as codes from './../constants/responseMessageCodes.js'

const teacherReducer = (
  state = {
    email: null,
    password: null,
    userId: null,
    status: 200,
    errorMessage: "Loading",
    allTeacher: [],
    showErrorPage: false,
    error: false
  },
  action
) => {
  let errorStatus
  let allTeacher
  switch (action.type) {
    /*adding the teacher to database*/
    case "ADD_USER_TEACHER_FULFILLED":
      state = {
        ...state,
        email: action.payload.email,
        password: action.payload.password,
        userId: action.payload.userId
      }
      return state
    /*getting teacher list as per the course selected*/
    case "GET_TEACHER_FULFILLED":
      state = {
        ...state,
        allTeacher: action.payload.result,
        errorMessage: action.payload.message
      }
      return state
    case "GET_TEACHER_REJECTED":
      errorStatus = action.payload.response.status
      switch(errorStatus){
        case 500:
          state = {
            error: true,
            status: 500,
            showErrorPage: true,
            errorMessage: "500 : Internal Server Error"
          }
          return state
        case 400:
          state = {
            error: true,
            status: 400,
            errorMessage: "BAD REQUEST"
          }
          return state
        case 403:
          state = {
            ...state ,
            error: true,
            showErrorPage : true,
            errorMessage : "403: Forbidden"
          }
          return state
        default:
          return state
      }
    /*changing the details of the teacher*/
    case "CHANGE_DETAILS_FULFILLED":
      allTeacher = state.allTeacher
      let result = action.payload.result
      for(let index = 0; index < allTeacher.length; index++){
        if(allTeacher[index].id === result.teacherId){
          allTeacher[index].department_id = result.department
          allTeacher[index].department_name = result.departmentName
          allTeacher[index].designation = result.designation
          allTeacher[index].joining_date = new Date(result.joinDate)
          allTeacher[index].teacher_email = result.email
          allTeacher[index].teacher_name = result.name
          break
        }
      }
      state = {
        ...state,
        allTeacher: allTeacher
      }
      return state
    /*deleting teachers*/
    case "DELETE_TEACHER_FULFILLED":
      allTeacher = state.allTeacher
      let isTeacherListEmptyError = false
      let message = "Loading"
      for(let index = 0; index < allTeacher.length; index++){
        if(allTeacher[index].id === action.payload.teacher)
        {
          allTeacher.splice(index,1)
        }
      }
      if(allTeacher.length == 0){
        isTeacherListEmptyError = true
        message = "No records found"
      }
      state = {
        ...state,
        error: isTeacherListEmptyError,
        allTeacher: allTeacher,
        errorMessage: message
      }
      return state
    case "DELETE_TEACHER_REJECTED":
      errorStatus = action.payload.response.status
      switch(errorStatus){
        case 500:
          state = {
            status: 500,
            showErrorPage: true,
            errorMessage: "500 : Internal Server Error"
          }
          return state
        case 400:
          state = {
            status: 400,
            errorMessage: "BAD REQUEST"
          }
          return state
        case 403:
          state = {
              ...state ,
              showErrorPage : true,
              errorMessage : "403: Forbidden"
          }
          return state
        default:
          return state
      }
    /*approving the teacher's addition to the system*/
    case "APPROVE_TEACHER_FULFILLED":
      let allTeacherStored = state.allTeacher
      for(let index = 0; index < allTeacherStored.length; index++){
        if(allTeacherStored[index].id === action.payload.teacher)
        {
          allTeacherStored[index].approved = true
        }
      }
      state = {
        ...state,
        allTeacher: allTeacherStored
      }
      return state
    case "APPROVE_TEACHER_REJECTED":
      errorStatus = action.payload.response.status
      switch(errorStatus){
        case 500:
          state = {
            status: 500,
            showErrorPage: true,
            errorMessage: "500 : Internal Server Error"
          }
          return state
        case 400:
          state = {
            status: 400,
            errorMessage: "BAD REQUEST"
          }
          return state
        case 403:
          state = {
              ...state ,
              showErrorPage : true,
              errorMessage : "403: Forbidden"
          }
          return state
        default:
          return state
      }
    /*getting teacher as per the course selected and their respective feedbacks(used in feedback module)*/
    case "GET_TEACHER_AND_FEEDBACK_FULFILLED":
      state = {
        ...state,
        status: 200,
        allTeacher: action.payload.data,
        errorMessage: action.payload.message
      }
      return state
    case "GET_TEACHER_AND_FEEDBACK_REJECTED":
      errorStatus = action.payload.response.status
      switch(errorStatus){
        case 500:
          state = {
            status: 500,
            showErrorPage: true,
            errorMessage: "500 : Internal Server Error"
          }
          return state
        case 400:
          state = {
            status: 400,
            errorMessage: "BAD REQUEST"
          }
          return state
        case 403:
          state = {
              ...state ,
              showErrorPage : true,
              errorMessage : "403: Forbidden"
          }
          return state
        default:
          return state
      }
    /*resets the error page to false so that the error page does not open for every case*/
    case "RESET_ERROR":
        state={
            ...state,
            showErrorPage: false,
            errorMessage: "Loading"
        }
        return state

    default:
      return state
  }
}

export default teacherReducer
