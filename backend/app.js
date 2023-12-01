const express = require('express');
const app = express();
const ErrorHandler = require("./middleware/error");

app.use(express.json())

const product = require("./routes/productRoutes");
const user = require("./routes/userRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);

app.use(errormiddleware);

module.exports = app