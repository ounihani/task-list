const express = require('express');
const router = express.Router();
const TaskList = require('../models/TaskList');
const { check, validationResult } = require('express-validator');


router.post('/task/find_or_create/:task_list_name', [check('task_list_name', 'task list name should not be empty').notEmpty()], (req, res) => {

    //checking validation result
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg,
        });
    }

    TaskList.findOne({ "name": req.params.task_list_name }).then(taskList => {
        if (taskList) {
            return res.status(200).json({
                msg: "retrieved succesfully",
                task_list: taskList
            });
        } else {
            let taskList = new TaskList({
                name: req.params.task_list_name
            })
            taskList.save().then((taskList) => {
                return res.status(201).json({
                    msg: "newly created task list",
                    task_list: taskList
                });
            }).catch(err => {
                return res.status(500).json({
                    msg: "error while saving",
                    err: err
                });
            })
        }
    }).catch(err => {
        return res.status(500).json({
            msg: "erro while retrieving",
            err: err
        });
    });
});

router.post('/task/:task_list_id', [check('task_list_id', 'task list Id should not be empty').notEmpty(), check('task_name', 'task  name should not be empty').notEmpty()], (req, res) => {

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg,
        });
    }

    TaskList.findOne({ "_id": req.params.task_list_id }).then(taskList => {
        if (taskList) {
            taskList.tasks.push({ task_name: req.body.task_name })
            taskList.save()
                .then(taskList => {
                    return res.status(201).json({
                        msg: "task created",
                        task_list: taskList
                    });
                })
                .catch(err => {
                    return res.status(500).json({
                        msg: "saving error",
                        err: err
                    });
                });
        } else {
            return res.status(404).json({
                msg: "Task list not found",
                err: err
            });
        }
    }).catch(err => {
        return res.status(500).json({
            msg: "erro while retrieving",
            err: err
        });
    });

});


router.delete('/task/:task_list_id', [check('task_list_id', 'task list Id should not be empty').notEmpty(), check('task_id', 'task  Id should not be empty').notEmpty()], (req, res) => {
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            error: errors.array()[0].msg,
        });
    }

    TaskList.findOne({ "_id": req.params.task_list_id }, (err, taskList) => {
        if (!err) {
            if(!taskList){
                return res.status(404).json({
                    msg: "taskList not found"
                });
            }else{
                if(!taskList.tasks.id(req.query.task_id)){
                    return res.status(404).json({
                        msg: "task not found"
                    });
                } else {
                    taskList.tasks.id(req.query.task_id).remove((err)=>{
                        console.log("bye bye");
                        if(err){
                            return res.status(400).json({
                                msg: "error while removing task",
                                err: err
                            });
                        }
                    });
                    taskList.save((err,result)=>{
                        if(!err){
                            return res.status(200).json({
                                msg: "task removed successfully",
                                err: err
                            });
                        }else{
                            return res.status(400).json({
                                msg: "error while saving the updated task list",
                                err: err,
                                task_list: result
                            });
                        }
                    })
                }
                
            }
        } else {
            return res.status(400).json({
                msg: "error while retrieving tasklist",
                err: err
            });
        }
    });

});

module.exports = router;