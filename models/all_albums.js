const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const allAlbsSchema = new Schema({

    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    author_id:{
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

const AllAlbums = mongoose.model("all_albums", allAlbsSchema);

module.exports = AllAlbums;