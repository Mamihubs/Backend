const mongoose = require("mongoose")

const url = process.env.MONGO_DB_CONNECTION_STRING

import loadProductsToDB from "./loadProductsToDB";

const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

connect
    .then((db: object) => {
        
        console.log("Connected to DB");
        // loadProductsToDB();

    })
    .catch((err: object) => console.log(err))