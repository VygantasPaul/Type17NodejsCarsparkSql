const db = require("../db");

const ALL_CARS = async (req, res) => {
    try {
        const cars = await db.query("SELECT * from cars")
        return res.status(201).json({ response: cars.rows, status: "Cars" })
    } catch (err) {
        console.log("ERROR: ", err);
        return res.status(500).json({ response: "something went wrong" });
    }
}
const GET_CAR_ID = async (req, res) => {
    try {
        const carId = parseInt(req.params.id);
        if (isNaN(carId)) {
            return res.status(400).json({ response: "Invalid car ID", status: "Error" });
        }

        const car = await db.query(`SELECT * from public.cars WHERE id = ${carId}`);
        if (car.rows.length === 0) {
            return res.status(404).json({ response: "Car not found", status: "Error" });
        }

        return res.status(200).json({ response: car.rows[0], status: "Car ID" });
    } catch (err) {
        console.log("ERROR: ", err);
        return res.status(500).json({ response: "Something went wrong", status: "Error" });
    }
};

const ADD_CAR = async (req, res) => {
    try {
        if (!req.body.title || !req.body.price || !req.body.numberplates) {
            return res.status(400).json({ response: "All fields are required" });
        }
        const car = await db.query(`INSERT into public.cars (title,image,price,numberplates) VALUES ('${req.body.title}','${req.body.image}','${req.body.price}','${req.body.numberplates}') `)
        return res.status(201).json({ response: car, status: "Car added" })
    } catch (err) {
        console.log("ERROR: ", err);
        return res.status(500).json({ response: "something went wrong", });
    }
}
const UPDATE_CAR = async (req, res) => {
    try {
        if (!req.body.title && !req.body.price && !req.body.numberplates) {
            return res.status(400).json({ response: "At least one field is required for update" });
        }
        const car = await db.query(`UPDATE public.cars SET title = '${req.body.title}', image = '${req.body.image}', price = '${req.body.price}', numberplates = '${req.body.numberplates}' WHERE id = '${req.params.id}' `)
        return res.status(201).json({ response: car, status: "Car updated" })
    } catch (err) {
        console.log("ERROR: ", err);
        return res.status(500).json({ response: "something went wrong" });
    }
}
const DELETE_CAR = async (req, res) => {
    try {
        const car = await db.query(`DELETE from public.cars WHERE id=${req.params.id} `);

        return res.json({ response: car.rows, status: "Car was deleted" });
    } catch (err) {
        console.log("ERROR: ", err);
        res.status(500).json({ response: "something went wrong" });
    }
};
module.exports = { ALL_CARS, GET_CAR_ID, ADD_CAR, UPDATE_CAR, DELETE_CAR }