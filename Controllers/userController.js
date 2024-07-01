const { request, response} = require("express"); //express
const jwt = require("jsonwebtoken"); //jwt token
const users = require("../Models/userModel"); //model for mongoose to mongoDB
const otpusers = require("../Models/otpModel");
const nodemalier = require("nodemailer");
const accountSid = process.env.accountSid;
const authToken = process.env.authToken;
const twilio = require("twilio")(accountSid, authToken);

//twilio for phnumber otp generation and send

exports.photp = async (request, response) => {
  try {
    const [{ client_number }] = request.body;
    const newclient_number =
      client_number.length == 13 ? client_number : `+91${client_number}`; //set crrt ph format
    //generate random otp
    generatedph_otp = Math.floor(1000 + Math.random() * 9000);
    await twilio.messages.create({
      body: `${generatedph_otp}`,
      to: `${newclient_number}`,
      from: "+17174039190",
    });
    const newuser = otpusers({
      ph_number: newclient_number,
      ph_otp: generatedph_otp,
    });
    await newuser.save();
    response.status(200).send("sended");
  } catch (error) {
    console.log(error);
    response.status(500).send({ error: "server error please try again" });
  }
};

//twilio ph otp verification
exports.phverify = async (request, response) => {
  try {
    const { ph_number, ph_otp } = request.body;
    let verifiedUser = await otpusers.findOne({ ph_number, ph_otp });
    console.log(verifiedUser);
    if (verifiedUser) {
      response.status(200).json({ message: `sucess` });
    } else {
      response.status(400).json({ message: "Invalid OTP or Phone Number" });
    }
  } catch (error) {
    response.status(500).json({ message: "Internal server error", error });
  }
};

//setup nodemailer
const transporter = nodemalier.createTransport({
  // host:'localhost',
  // port:3000,
  service: "gmail",
  // secure:false,
  auth: {
    user: process.env.USEREMAIL,
    pass: process.env.USERPASSWORD,
  },
});

//Register new user
exports.register = async (request, response) => {
  const { email, username, password } = request.body; //
  try {
    const existingUser = await users.findOne({ email, username }); // checking request body  and model

    if (existingUser < 0) {
      // await sendOTPtoEmail();
      response.status(406).json("User already exist , please login !!!");
    } else {
      const newUser = new users({
        email,
        username,
        password,
      });

      await newUser.save();
      response.status(200).json(newUser);
    }
  } catch (error) {
    response.status(401).json(error);
  }
};

//login existing User
exports.login = async (request, response) => {
  try {
    const { email, password } = request.body;
    const existingUser = await users.findOne({ email, password });
    if (existingUser) {
      // success
      //token
      const token = jwt.sign({ existingUser }, process.env.jwt_secret); //payload,key
      // console.log(token);
      response.status(200).json({ existingUser, token });
      // await existingUser.save();
    } else {
      response.status(406).json("invalid Email / password");
    }
  } catch (err) {
    response.status(401).json(err);
  }
};

// email opt generation
exports.sendOTPtoEmail = async (request, response) => {
  try {
    const [{client_email }] = request.body;
    console.log(client_email);
    if (!client_email) {
      return response.status(400).json("Server error : no email");
    }
    //random otp genrate
    const otp = Math.floor(1000 + Math.random() * 9000);
    //email structure
    const mailOptions = {
      from: "jithinbinoy2000@gmail.com",
      to: client_email,
      subject: "Register verification",
      html: `Your One Time Password for Register is <b>${otp}</b>`,
    };

    // Sending email
    await transporter.sendMail(mailOptions);

    //save in mongo
    const newOtpUser = new otpusers({ email: client_email, emailotp: otp });
    await newOtpUser.save();
    response.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    response.status(500).json({ error: "Failed to send OTP email" });
  }
};

// verify email otp
exports.verifyemail = async (request,response) => {
  try {
    const [{client_email,otp}]= request.body;
      // console.log(request.body);
      console.log(client_email);
    let successuser = await otpusers.findOne({
      email:client_email,
      emailotp:otp
    });
    console.log(successuser);
    if (successuser) {
      await otpusers.findOneAndDelete({client_email,emailotp:otp});
      return response.status(200).json({ message: "verified" });
    }
    console.log(successuser);
    return response.status(400).send({status:400,message: "email/opt is incorrect" });
  } catch (error) {
    console.log(error);
    return response
      .status(500)
      .send({ message: "internal server error please try again",error });
      
  }
};
