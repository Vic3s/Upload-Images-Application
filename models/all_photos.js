const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const allPhtsSchema = new Schema({

    title: {
        type: String,
        require: true
    },
    img: {
        data: Buffer,
        contentType: String
    },
    author: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    album: {
        type: String,
        require: true
    }
    

},{ timestamps: true });

const AllPhotos = mongoose.model("all_photos", allPhtsSchema);

module.exports = AllPhotos;