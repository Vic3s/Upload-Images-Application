const db_helper = require('../configuration/database_manipulation')
const PublicAlbums = require('../models/public_albums');
const AllAlbums = require('../models/all_albums');

const create_post_get = async (req, res) => {

    if (await db_helper.all_albums_get_data([req.user.id]) == null){
        res.render('create.ejs', {albums_list: []})

    }else{
        res.render('create.ejs', {albums_list: await db_helper.all_albums_get_data([req.user.id])})
    }

}

const create_post_post = async (req, res) => {

    // check for album form or photo/image form

    if (req.body.album_name){

        // check for Public or Private album on adding of album

        if(req.body.album_type_radio == 'Public'){

            db_helper.public_album_create(req, res)

        }else if(req.body.album_type_radio == 'Private'){

           db_helper.private_album_create(req, res)

        }
    } else{

        //Add config for Photo save in Data Base Table AllPhotos

        let counter = 0
        let arr_albums = []

        //Get selected albums from request 

        // for(const key in req.body){
        //     console.log(key)
        //     counter++;
        //     if(counter > 3){
        //         arr_albums.push(key)
        //     }
        // }

        for(let i in req.body){
            console.log(i);
        }
        // console.log(req.body)
        
        // Upload to all Photos for info later

        for (let i in arr_albums){

            new AllPhotos({title: req.body.title_photo, file_path: req.file.filename, author: req.user.name, description: req.body.description_photo, 
                album: arr_albums[i], tags: req.body.tags_photo.split(' ')}).save()
            .then(result => {console.log(result)})
            .catch(err => console.log(err))

        }

        //Get all albums for the current user as a list of objects

        const get_albums_user = await AllAlbums.find({author: req.user.name})
        .then(result => {return result})
        .catch(err => console.log(err));

        //Compare if the albums match and exist, if yes input photo in the album object's array "photos"

        let count_albms = 0;

        for(let i in get_albums_user){

            if(arr_albums.includes(get_albums_user[count_albms].title)){
                //Input photo to AllAlbums photo database album

                await AllAlbums.updateOne({ author: req.user.name, title: get_albums_user[count_albms].title },
                    {$push: { photos: req.file.originalname }})
                    .then(result => {return result})
                    .catch(err => console.log(err))

                //Input photo to Public Photos photo database album

                if(get_albums_user[count_albms].album_type == 'Public'){

                    await PublicAlbums.updateOne({ author: req.user.name, title: get_albums_user[count_albms].title },
                        {$push: { photos: req.file.originalname }})
                        .then(result => {return result})
                        .catch(err => console.log(err))

                //Input photo to Private Photos photo database album

                }else if(get_albums_user[count_albms].album_type == 'Private'){

                    await PrivateAlbums.updateOne({ author: req.user.name, title: get_albums_user[count_albms].title },
                        {$push: { photos: req.file.originalname }})
                        .then(result => {return result})
                        .catch(err => console.log(err))

                }
            }
            count_albms++;
        }        
    }

    res.redirect('/create-post')

}

const create_post_del = (req, res) => {

    //del func

}

module.exports = {create_post_get, create_post_post}