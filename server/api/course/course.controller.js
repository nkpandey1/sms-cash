let model = require('./course.model')()
let sql= require('../../sqldb')
let batch = require('../batch/batch.model')()
let db=sql()
let courseFunctions = {
    getInitialData: (req,res) => {
        let dataToClient = {}
        if(req.body !== null){
         model.getCourse(db)
            .then((allCourse)=>{
                 dataToClient.course = allCourse
                    return batch.getBatch(db)
                })
        .then((allBatch)=>{
            dataToClient.batch = allBatch
            res.send(dataToClient)
        }).
          catch((data)=>{
              res.status(500).end()
        })
        }
         else{
            res.status(400).end()
         }
    },
    getCourses: (req, res) => {
        console.log("-------------------",req.body)
        if (Object.keys(req).length !== 0) {
            model.getCourse(db)
                .then((data) => {
                    res.status(200).json({data: data, msg: data.msg})
                })
                .catch((error) => {
                    res.status(500).json({data: [], msg:"Internal Server Error"})
                })
        }
        else {
             res.status(400).json({data:[],msg:"BAD REQUEST"})
        }

    },
    addCourse: (req, res) => {
        if (Object.keys(req).length !== 0) {
            if (Object.keys(req.body).length !== 0) {
                model.addNewCourse(db, req.body, function (data) {
                    console.log(data)
                    if(1==data.status){
                        res.status(200).json({data:data.data,msg:data.msg})
                    }
                    else {
                        if(data.msg=="COURSE_ALREADY_EXISTS")
                            res.status(400).json({data:[],msg:data.msg})
                        else
                            res.status(500).json({data:[],msg:data.msg})
                    }
                })
            }
            else {
                res.status(400).end()
            }
        }
        else {
            res.status(400).end()
        }
    },
    editCourse: (req, res) => {
        if (Object.keys(req).length !== 0) {
            if (Object.keys(req.body).length !== 0) {
                model.editCourse(db, req.body, (data) => {
                    res.send(data)
                })
            }
            else {
                res.status(400).end()
            }
        }
        else {
            res.status(400).end()
        }
    },
    deleteCourse: (req, res) => {
        if (Object.keys(req).length !== 0) {
            if (Object.keys(req.body).length !== 0) {
                console.log("IN CONTROLLER",req.body.id)
                model.deleteCourse(db, req.body.id, (data) => {
                    res.send(data)
                })
            }
            else {
                res.status(400).end()
            }
        }
        else {
            res.status(400).end()
        }
    }
}
module.exports=courseFunctions
