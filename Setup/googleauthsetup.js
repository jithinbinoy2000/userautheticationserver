require('dotenv').config();
const express = require('express')
const session = require('express-session')
const passport = require('passport');
const googleu = require('../Models/googleModel');
const gauth = express();
gauth.use(session({
    secret:'test',
    resave:true,
    saveUninitialized:true
}))
gauth.use(passport.initialize());
const  OAuth2Strategy = require('passport-google-oauth2').Strategy;
passport.use(
    new OAuth2Strategy({
        clientID:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        callbackURL:process.env.HOMEPAGEURL,
        scope:["profile","email"]
    },async(accessToken,refreshToken,profile,done)=>{
    let googleUser = await googleu.findOne({googleId:profile.id});
  
     if(!googleUser){
        googleUser =  new googleu({
                    googleId:profile.id,
                    displayName: profile.displayName,
                    email: profile.emails[0].value,
                    image: profile.photos[0].value
        });
        await googleUser.save();
    
    }
    return done(null,googleUser)
    }
)
);
passport.serializeUser((user,done)=>{
    done(null,user);
});
passport.deserializeUser((user,done)=>{
    done(null,user);
})
module.exports = gauth;