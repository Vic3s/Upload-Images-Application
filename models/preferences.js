const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const preferencesSchema = new Schema({

    account: {
        type: String,
        require: true
    },
    preferences: {
        type: String,
        require: true

    }

},{ timestamps: true });

const Preferences = mongoose.model("preferences", preferencesSchema);

module.exports = Preferences;