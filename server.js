const express= require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(express.json({extended: false}))
app.use(express.urlencoded({extended: false}))
app.use(cors());
require('dotenv').config();
app.use(cookieParser())


const EnduserRoute = require("./routes/EnduserRoutes");
const passwordRecoveryRoute = require("./routes/passwordRecoveryRoutes");
const BookRoute = require("./routes/BookRoutes")



app.use("/", EnduserRoute)
app.use("/", passwordRecoveryRoute)
app.use("/books", BookRoute)
app.all('*', (req, res) => {
    res.status(401).send('<h1>404! Page not found</h1>');
  });


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
