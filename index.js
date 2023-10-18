const express = require("express");
const cors = require("cors");
require("dotenv").config();
const taskRouter = require("./routes/car");

const app = express();
app.use(express.json());
app.use(cors());

app.use(taskRouter);

app.use((req, res) => {
    return res.status(404).json({ response: "Endpoint not exist" });
});

// eslint-disable-next-line no-undef
app.listen(process.env.PORT, () => {
    // eslint-disable-next-line no-undef
    console.log(`App started on port ${process.env.PORT}`);
});