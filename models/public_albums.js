const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const publicAlbsSchema = new Schema({

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

const PublicAlbums = mongoose.model("public_albums", publicAlbsSchema);

module.exports = PublicAlbums;