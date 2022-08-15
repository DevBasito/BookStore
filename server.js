const express= require('express');
const app = express();
app.use(express.json({extended: false}))
app.use(express.urlencoded({extended: false}))
require('dotenv').config()

const EnduserRoute = require("./routes/EnduserRoutes");
app.use("/", EnduserRoute)

const port = process.env.PORT;



app.listen(port, ()=>{
    console.log(`Server is Up and Running on Port ${port}`)
} )
