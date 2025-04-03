const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const frSentReqSchema = new Schema({

    from: {
        type: String,
        require: true
    },
    to:{
        type: String,
        require: true
    },
    sent_date:{
        
    }

})