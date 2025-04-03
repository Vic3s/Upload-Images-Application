const mongoose = require('mongoose')

const Account = require('../models/accounts');
const AllAlbums = require('../models/all_albums');
const AllPhotos = require('../models/all_photos');
const PrivateAlbums = require('../models/private_albums');
const PublicAlbums = require('../models/public_albums');
const SavedAlbums = require('../models/saved_albums');
const bcrypt = require('bcrypt');

//Connection string

const db_connection_string = 'mongodb+srv://admin:admin123@cluster0.5clrgsm.mongodb.net/Alb_DB?retryWrites=true&w=majority&appName=Cluster0'

// Geting Data Functions

const singe_album_get_data = async (user_info) => {
    return await AllAlbums.findOne({author_id: user_info})
    .then(result => { return result })
    .catch(err => console.log(err));
}

const all_albums_get_data = async (user_info) => {
    return await AllAlbums.find({author_id: user_info[0]})
    .then(result => { return result })
    .catch(err => console.log(err));
}

const private_albums_get_data = async (user_info) => {
    return await PrivateAlbums.findOne({author_id: user_info[0]})
    .then(result => { return result })
    .catch(err => console.log(err));
}

const public_albums_get_data = async (user_info) => {
    return await PublicAlbums.findOne({author_id: user_info[0]})
    .then(result => { return result })
    .catch(err => console.log(err));
}

// Postin data to DB Functions

const public_album_create = (req, res) => {

    // Adding to Public Albums table
    console.log("TestFunc")
    const album_public = new PublicAlbums({title: req.body.album_name, author_id: req.user.id, 
        author: req.user.name, cover_img: req.body.album_cover, photos: [], quote: req.body.album_quote, 
        description: req.body.album_description, album_type: req.body.album_type_radio})

        album_public.save()
        .then((result) => {})
        .catch((err) => { console.log(err) })

    // Dont forget we add to AllAlbums table too

    const album_all = new AllAlbums({title: req.body.album_name, author_id: req.user.id,
        author: req.user.name, cover_img: req.body.album_cover, photos: [], quote: req.body.album_quote, 
        description: req.body.album_description, album_type: req.body.album_type_radio})

        album_all.save()
        .then((result) => {})
        .catch((err) => { console.log(err) })
} 

const private_album_create = (req, res)  => {

    // Adding to Private Albums DataBase

    const album_private = new PrivateAlbums({title: req.body.album_name, author_id: req.user.id,
        author: req.user.name, cover_img: req.body.album_cover, photos: [], quote: req.body.album_quote, 
        description: req.body.album_description, album_type: req.body.album_type_radio})

        album_private.save()
        .then((result) => {})
        .catch((err) => { console.log(err) })

    // Adding to All Albums DataBase

    const album_all = new AllAlbums({title: req.body.album_name, author_id: req.user.id,
        author: req.user.name, cover_img: req.body.album_cover, photos: [], quote: req.body.album_quote, 
        description: req.body.album_description, album_type: req.body.album_type_radio})

        album_all.save()
        .then((result) => {})
        .catch((err) => { console.log(err) })
}

//Create account function 

const acc_create = async (req, res) => {

    try{
        // Add to Accounts DataBase 

        const hashed_pass = await bcrypt.hash(req.body.password, 10)
        const account = new Account({email: req.body.email, name: req.body.name, password: hashed_pass, bio: req.body.bio})

        account.save()
        .then((result) => {
            console.log(result)
            res.redirect('/login')
        }).catch((err) => {
            console.log(err)
        })
    }catch{
        res.redirect("signup")
    }
}

// Establishing connection

const dbConnection = () => {
    mongoose.connect(db_connection_string)
    .then((result) => {console.log("DB connection established")})
    .catch((err) => console.log(err));
}

module.exports =
{   
    all_albums_get_data,
    singe_album_get_data,
    private_albums_get_data,
    private_album_create,
    public_albums_get_data,
    public_album_create,
    acc_create,
    dbConnection
}