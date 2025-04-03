const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Account = require('./models/accounts');
const AllAlbums = require('./models/all_albums');
const AllPhotos = require('./models/all_photos');
const PrivateAlbums = require('./models/private_albums');
const PublicAlbums = require('./models/public_albums');
const SavedAlbums = require('./models/saved_albums');

const db_helper = require('./configuration/database_manipulation')

const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const method_override = require('method-override');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');
const dotenv = require('dotenv');

const controller_create_post = require('./controllers/create_post_controller')

const initializePassport = require('./configuration/passport-config.js');

// Passport initializasion with methods for id and user(get by email)

initializePassport(passport, 
    email => Account.findOne({'email': email})
    .then((result) => { return result })
    .catch(err => console.log(err)),

    id => Account.findOne({'_id': id})
    .then((result) => {return result})
    .catch(err => console.log(err))
)
 
// middleware settings

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('static_/styles'));
app.use(express.static('static_/images'));
app.use(express.static('static_/js_frontend'));
app.use(morgan("dev"));
app.use(flash())
app.use(session({
    secret: 'Secret',
    resave: false,
    saveUninitialized: false,
}))

//passport session settings(intialization)

app.use(passport.initialize())
app.use(passport.session())
app.use(method_override('_method'))


// Storage location config

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '/uploads/'));
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

const upload = multer({ storage: storage })


// homepage get function

app.get('/', (req, res) => {
    if (req.user){
        res.render('index.ejs', { path_nav: './partials/nav.ejs' })
    }else{
        res.render('index.ejs', { path_nav: './partials/nav_not_loged.ejs' })
    }

})

// Create-post get function

app.get('/create-post', checkAuthenticated, controller_create_post.create_post_get)

// Create-post post function

app.post('/create-post', upload.single("photo_upload_file"), controller_create_post.create_post_post)

// Get function for Profile page

app.get('/profile', checkAuthenticated, async (req, res) => {

    const private_albums_list = await PrivateAlbums.find({author: req.user.name})
    .then(result => { return result })
    .catch(err => console.log(err))

    const public_albums_list = await PublicAlbums.find({author: req.user.name})
    .then(result => { return result })
    .catch(err => console.log(err))


                                  //CHANGE AUTHOR LATER HERE!!!    | 
                                  //                              \/

    const saved_albums_list = await SavedAlbums.find({author: 'Test_text'})
    .then(result => { return result })
    .catch(err => console.log(err))

    // const saved_albums_list = await .find({author: req.user.name})

    res.render('profile.ejs', {pf_name: req.user.name , pf_bio: req.user.bio, pf_email: req.user.email,
         private_alb: private_albums_list, public_alb: public_albums_list, saved_alb: saved_albums_list})

})

// get function for Sign Up page

app.get('/signup', checkNotAuthenticated, (req, res) => {
    res.render('signup.ejs')
})

// post function for Sign Up page

app.post('/signup', db_helper.acc_create)

// get function for Log In page

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

// post function for Log In page

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

// Log out function/ endpoint

app.delete('/logout', (req, res) => {
    req.logOut(() => {});
    res.redirect('/login');
})

// Object with album data to pass to get functions
// And array to fill with photo objects to coresponding album

let send_object_to_get = {};
let array_photo_objs = [];

// post function for Details page

app.post('/details', checkAuthenticated, async (req, res) => {

    // Get the album object to send all info about album
    // await PrivateAlbums.findOne({_id: req.body.id_album})
    // .then(async result => {

    //     for(i in result.photos){

    //         array_photo_objs.push(
    //             await AllPhotos.findOne({file_path: album_by_id.photos[i]})
    //                 .then(result => { return result })
    //                 .catch(err => console.log(err))
    //         )
    //     }
    
    //     Object.assign(send_object_to_get, {"album_obj": result});
    //     Object.assign(send_object_to_get, {"photos_obj": array_photo_objs});
    
    //     res.redirect("/details")    

    // })
    // .catch(err => console.log(err));

    // // Loop to create an array

    // await AllAlbums.findOne({})
    // .then(result => {return result})
    // .catch(err => console.log(err));
    // post = req.body.
    // res.render(album-details.ejs)
})

// get function for Details page

app.get('/details', checkAuthenticated, (req, res) => {

    // album_obj = send_object_to_get.album_obj;
    // photos_obj = send_object_to_get.photos_obj;

    console.log(req.body);


    res.render("album-details.ejs", {path_nav: "./partials/nav.ejs",
        album_obj: {photos:[]}, photos_obj: {}})
})

// checking authentication function

function checkAuthenticated (req, res, next) {
    if (req.isAuthenticated()){
        return next()
    }
    res.redirect('login');
}

// checking not authentication function

function checkNotAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return res.redirect('/')
    }
    next()
}

// connection to DataBase

db_helper.dbConnection()

app.listen(5000, () => console.log('Up and running...'));


