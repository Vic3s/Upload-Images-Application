const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const Account = require('C:/Users/user/Desktop/Alb(Test_Stuff_Version)/models/accounts')

function initialize(passport, getUserByEmail, getUserById){

    const autheticateUser = async (email, password, done) => {

        const user = await getUserByEmail(email)

        // console.log(user)
        
        if (user == null){
            return done(null, false, {message: 'No User Found...'})
        }
        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user)
            } else {
                return done(null, false, {message: 'Incorrect Password...'})
            }
        }
        catch (e){
            return done(e)
        }
    }

    passport.use(new LocalStrategy({usernameField: "email"}, autheticateUser))
    passport.serializeUser((user, done) => {done(null, user._id)})
    passport.deserializeUser(async (id, done) => { done(null, await getUserById(id)) })

}

module.exports = initialize