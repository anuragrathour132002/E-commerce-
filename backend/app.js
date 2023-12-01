const express = require('express');
const app = express();
const ErrorHandler = require("./middleware/error");
const cookie = require("cookie-parser");


app.use(cookieParser());
app.use(express.json());





const cookieParser = require('cookie-parser');
const product = require("./routes/productRoutes");
const user = require("./routes/userRoute");




app.use("/api/v1", product);
app.use("/api/v1", user);

app.use(errormiddleware);

module.exports = app