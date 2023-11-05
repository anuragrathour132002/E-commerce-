const express = require('express');

const app = express();
app.use(express.json())

const producr = require("./routes/productRoutes");

app.use("/api/v1", product);




module.exports = app