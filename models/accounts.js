const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const accSchema = new Schema({

    email: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    bio: {
        type: String
    }

},{ timestamps: true });

const Account = mongoose.model("accounts", accSchema);

module.exports = Account;