const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("shutting dawn th server sue to uncought Exception");
    process.exit(1);;
})



dotenv.config = ({ path: "backend/config/config.env" });

connectDatabase();
const server = app.listen(process.env.PORT, () => {


    console.log(`the server is working on port http://localhost:${process.env.PORT}`);
});



process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`shutting down th erver due to unhandled promises Rejection`);
    server.close(() => {
        process.exit(1);
    });
});





