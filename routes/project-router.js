const express = require("express");
const projectRouter=express.Router();
const projectController = require("../controllers/project-controller")
const veriryInitiator=require('../middleware/verifyInitiator')
const verifyJWT=require('../middleware/verifyJWT')

projectRouter.route('/')
    .post([verifyJWT,veriryInitiator],projectController.addProject)

projectRouter.route('/:projectId')
    .get(projectController.getProjectById)
    

projectRouter.route('/')
    .get(projectController.getProjectsByInitiatorId)


projectRouter.route('/:projectId')
    .put([verifyJWT,veriryInitiator],projectController.updateProject)


projectRouter.route('/:projectId')
    .delete([verifyJWT,veriryInitiator],projectController.deleteProject)


module.exports = projectRouter;
