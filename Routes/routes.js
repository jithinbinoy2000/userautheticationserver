const userController = require("../Controllers/userController"); //import controller server
const {getLoggedInUser,logoutUser} = require("../Controllers/googleController");
const express = require("express"); //import express js
const router = express.Router(); // set path
//set path for register
router.post("/register", userController.register);
// set path for login
router.post("/login", userController.login);
const passport = require("passport");
// Google OAuth route
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", {
        successRedirect: "http://localhost:5173/home",
        failureRedirect: "http://localhost:5173/login",
    })
);

router.get("/login/success", getLoggedInUser);

router.get("/logout", logoutUser);

router.post("/otp", userController.sendOTPtoEmail);
router.post("/otpverify", userController.verifyemail);
router.post("/photp", userController.photp);
router.post("/phverify", userController.phverify);
module.exports = router;
module.exports = router;

