const courseReducer = (state = {
    course : [],
    pagedCourses: [],
    snackbarOpen:false,
    snackbarMessage:"",
    value : "a",
    totalPages : 0,
    currentPage : 1
},action) => {
    switch(action.type){
        case "SET_COURSE":
            state = {
                ...state ,
                course : action.payload
            }
            break
        case "SET_PAGED_COURSES":
            state = {
                ...state ,
                pagedCourses:action.payload
            }
            break
        case "SET_SNACKBAR_OPEN":
            state ={
                ...state ,
                snackbarOpen:action.payload
            }
            break
        case "SET_SNACKBAR_MESSAGE":
            state ={
                ...state ,
                snackbarMessage : action.payload
            }
            break
        case "SET_VALUE":
            state = {
                ...state,
                value : action.payload
            }
            break
        case "GET_COURSES_FULFILLED" :
            var course  = action.payload
            console.log("----------------------------------------------------",course)
            var size = course.length
            var pagedCourses = []
            for(let index in course ){
                if(index<10){
                    pagedCourses.push(course[index])
                }
            }
            if(0==pagedCourses){
                state = {
                    ...state ,
                    snackbarMessage : "Nothing to Show",
                    snackbarOpen : true
                }
            }
            state  = {
                ...state ,
                course : course ,
                totalPages : size ,
                pagedCourses : pagedCourses
            }
            break

        case "ADD_COURSE_FULFILLED":
            var data = action.payload
            if(data.status==1){
                let newCourse = data.data
                let course = state.course
                course.push(newCourse)
                var size = course.length
                var pagedCourses = []
                for(let index  in course){
                    if(index<10){
                        pagedCourses.push(course[index])
                    }
                }
                state = {
                    ...state ,
                    course : course ,
                    snackbarOpen : true,
                    snackbarMessage : "Course Added",
                    value : 'a',
                    totalPages : size ,
                    currentPage : 1,
                    pagedCourses : pagedCourses
                }
            }
            else {
                state = {
                    ...state ,
                    snackbarMessage : data.msg,
                    snackbarOpen : true
                }
            }
            break

        case "EDIT_COURSE_FULFILLED":
            var content = action.payload
            var data = content.data
            if(content.status==1){
                let course = state.course
                for(let index in course){
                    if(course[index].id===data.id){
                        course[index] = data
                    }
                }
                var size = course.length
                var pagedCourses = []
                for(let index in course){
                    if(index<10){
                        pagedCourses.push(course[index])
                    }
                }
                state = {
                    ...state ,
                    course  : course ,
                    totalPages : size ,
                    currentPage : 1 ,
                    pagedCourses:pagedCourses ,
                    snackbarMessage : "Field Edited Successfully",
                    snackbarOpen : true
                }
            }
            else {
                this.props.setSnackbarMessage("Internal Server Error")
                this.props.setSnackbarOpen(true)
                state = {
                    ...state ,
                    snackbarMessage : "Internal Server Error",
                    snackbarOpen : true
                }
            }

            break

        case "DELETE_COURSE_FULFILLED":
            var course = state.course
            var data = action.payload.data
            console.log(course)
            console.log(data)
            for(let index in course){
                if(course[index].id==data){
                    console.log("true")
                    course.splice(index,1)
                }
            }
            var size = course.length
            var pagedCourses = []
            for(let index in course ){
                if(index<10){
                    pagedCourses.push(course[index])
                }
            }
            state = {
                ...state ,
                course : course ,
                totalPages : size ,
                currentPage: 1,
                snackbarOpen :true ,
                snackbarMessage : "Course Deleted",
                pagedCourses:pagedCourses
            }
            break
        case "SET_PAGINATION":
            var data = action.payload
            var pagedCourses = data.pagedCourses
            var currentPage = data.currentPage
            state = {
                ...state ,
                pagedCourses ,
                currentPage
            }
            break
    }
    return state
}
export default courseReducer