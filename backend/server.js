const app = require("./app");
const env = require("dotenv");

dotenv.config = ({ path: "backend/config/config.env" })
app.listen(process.env.PORT, () => {


    console.log(`the server is working on port http://localhost:$(process.env.PORT)`)
})
