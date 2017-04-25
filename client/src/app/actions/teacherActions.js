import teacher from '../utils/api/teacher.js';
import * as types from '../constants/index.js';

export function getTeacherAndFeedback(data){
	return {
		type: types.GET_TEACHER_AND_FEEDBACK,
		payload:
			teacher.getTeacherAndFeedback(data)
			.then((response) => {
				response.data.status= response.status
				return response.data
			})
	}
}

export function resetToNoErrorTeacher(){
    return {
        type: types.RESET_ERROR
    }
}


export function addUser(details){
	return {
		type: types.ADD_USER_TEACHER,
		payload:
			teacher.addUser(details)
			.then((response) => {
				response.data.status= response.status
				return response.data;
      })
	}
}

export function getTeacher(courseDetails){
	return {
		type: types.GET_TEACHER,
		payload:
			teacher.getTeacher(courseDetails)
			.then((response) => {
				response.data.status= response.status
				return response.data
			})
	}
}

export function changeDetails(details){
	return {
		type: types.CHANGE_DETAILS,
		payload:
			teacher.changeDetails(details)
			.then((response) => {
				response.data.status= response.status
				return response.data
			})
	}
}

export function deleteTeacher(teacherId){
	return {
		type: types.DELETE_TEACHER,
		payload:
			teacher.deleteTeacher(teacherId)
			.then((response) => {
				response.data.status= response.status
				return response.data
			})
	}
}

export function approveDetails(teacherId) {
	return {
		type: types.APPROVE_TEACHER,
		payload:
			teacher.approveDetails(teacherId)
			.then((response) => {
				response.data.status= response.status
				return response.data
			})
	}

}
