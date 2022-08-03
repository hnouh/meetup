const express = require('express')
const app = express()

const port=7000;
const mongoose = require('mongoose')

var cors = require('cors')

const uri ="mongodb+srv://hnouh:hnouh123@cluster0.rpbco.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

app.use(express.json())
app.use(cors())

//Grocery
const groceryRouter = require('./routes/grocery');
app.use(groceryRouter);

app.listen(port, function(){
    console.log("app listen to port "+ port)
})