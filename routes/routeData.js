const router = require('express').Router(); //Access the router on Express 

const controller = require('../controllers/controllerData'); //Access the controllers

//POST
router.post("/addData", (req, res) => {
    controller.addData(req, res);
});

//GET
router.get("/readData", (req, res) => {
    controller.readData(req, res);
});



module.exports = router;