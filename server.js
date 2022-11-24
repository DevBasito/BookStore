const express= require('express');
const app = express();
app.use(express.json({extended: false}))
app.use(express.urlencoded({extended: false}))
require('dotenv').config()

const EnduserRoute = require("./routes/EnduserRoutes");
app.use("/", EnduserRoute)

const port = process.env.PORT;

const mongoose = require("mongoose");
const connectionString = process.env.MONGO_URI;

mongoose.connect(connectionString, {
    useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("Database Connected")
    }

}
)

app.listen(port, ()=>{
    console.log(`Server is Up and Running on Port ${port}`)
} )
