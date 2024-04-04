const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const otp_generator = require("otp-generator");
const dotenv = require('dotenv')
const nodemailer = require("nodemailer");
dotenv.config()

const Mailgen = require("mailgen");
const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(403).json({ msg: "User already exists" });
    }

   
    const saltRounds = 10;
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, saltRounds);
    } catch (bcryptError) {
      console.error("Error hashing password with bcrypt:", bcryptError);
      return res.status(500).json({ msg: "Error hashing password" });
    }

   
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    
    await newUser.save();

   
    return res.status(201).json(newUser);
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({ email: Email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(Password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
    const userName = user.userName;
    const token = jwt.sign({ userId: user._id }, process.env.JWT);
    return res.status(200).json({ token, userName });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    return res.status(200).json({ userName: user.userName });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
const local = async (req, res, next) => {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
};

const generateOTP = async (req, res) => {
  try {
    const { email, userName } = req.body;
    req.app.locals.OTP = await otp_generator.generate(6, {
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });
    let config = {
      service: "gmail",
      auth: {
        user: process.env.Email,
        pass: process.env.PASSWORD
      },
    };
    let transporter = nodemailer.createTransport(config);
    let MailData = new Mailgen({
      theme: "default",
      product: {
        name: "Mailgen",
        link: "https://mailgen.js/",
      },
    });
    let response = {
      body: {
        name: `Hi ${userName}`,
        intro:`your OTP is ${req.app.locals.OTP}`,
        data: {
          OTP: req.app.locals.OTP,
        },
      },
    };
    let mail = MailData.generate(response);
    let message = {
      from: "rahuljbhuvi@gmail.com",
      to: email,
      subject: "OTP to reset password",
      html: mail,
    };

    await transporter.sendMail(message);
    return res.status(201).json({ msg: "You should receive an email" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to generate OTP and send email" });
  }
};

const verifyOtp = async(req,res)=>
{
  const {combinedOTP} = req.body
  if(parseInt(combinedOTP) === parseInt(req.app.locals.OTP))
  {
    req.app.locals.resetSession=true
    req.app.locals.OTP=null
    return res.status(201).json({msg:"OTP verified sucessfully",status:201})
  } 
  else{
    return res.status(404).json({msg:"invalid OTP"})
  }
}
const resetPassword = async(req,res)=>
{
  try
  {
    if(!req.app.locals.resetSession)
    {
      return res.status(403).json({err:"session expired"})
    }
    const {Email,Password} = req.body
    const FindUser = await User.findOne({Email})
    const hashedPassword = await bcrypt.hash(Password,10)
    const updateUser = await User.updateOne({password:hashedPassword})
    if(updateUser)
    {
      req.app.locals.session = false
      return res.status(201).json({msg:"Record updated"})
    }
  }
  catch(err)
  {
    console.log(err);
    return res.status(404).json(err)
  }
}
module.exports = { register, resetPassword,login,verifyOtp ,getUser, local, generateOTP };
