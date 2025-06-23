const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://reddysaikumar254:j8arDrgD1Ofw7Lay@cluster0.pixq7ho.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

.then(()=>{
   console.log("connected to mongodb")
})