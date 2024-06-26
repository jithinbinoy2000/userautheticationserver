
const userdb = require('../Models/googleModel');

async function getLoggedInUser(req,res) {
    if (req.user) {
        res.status(200).json({ message: "User Login Successful", user: req.user });
    } else {
        res.status(400).json({ message: "Not Authorized User" });
    }
}

function logoutUser(req,res,next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect("http://localhost:5173");
    });
}

module.exports = {
    getLoggedInUser,
    logoutUser
};