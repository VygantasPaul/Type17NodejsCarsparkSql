const express = require("express");
const router = express.Router();

const { ALL_CARS, GET_CAR_ID, UPDATE_CAR, ADD_CAR, DELETE_CAR } = require("../controller/car")

router.get('/cars/', ALL_CARS)
router.get('/car/:id', GET_CAR_ID)
router.put('/car/:id', UPDATE_CAR)
router.post('/add-car/', ADD_CAR)
router.delete('/car/:id', DELETE_CAR)

module.exports = router;

