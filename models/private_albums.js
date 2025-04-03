const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const privateAlbsSchema = new Schema({

    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    cover_img: {
        type: String
    },
    photos: {
        type: Array,
    },
    quote: {
        type: String
    },
    description: {
        type: String
    },
    album_type: {
        type: String,
        require: true
    }

},{ timestamps: true });

const PrivateAlbums = mongoose.model("private_albums", privateAlbsSchema);

module.exports = PrivateAlbums;