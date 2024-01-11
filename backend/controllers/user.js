const User = require("../Models/User");
const bcrypt = require('bcrypt')
const { validateEmail, validateLength, validateUsername } = require("../helpers/validation");
const { generateToken } = require("../helpers/token");
const { sendVerificationEmail } = require("../helpers/mailer");


exports.register = async (req, res) => {
  try {
    const {
        firstName,
        lastName,
        password,
        email,
        username,
        birthYear,
        birthMonth,
        birthDay,
        gender
      } = req.body;

      if(!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" });
      }

      const existingEmail = await User.findOne({ email });
      if(existingEmail) {
        return res.status(400).json({message:"This email is already in use."})
      }

      if(!validateLength(firstName, 2, 35)) {
        return res.status(400).json({message: "First name must be between 2 and 35 characters"})
      }

      if(!validateLength(lastName, 2, 35)) {
        return res.status(400).json({message: "Last name must be between 2 and 35 characters"})
      }

      if(!validateLength(password, 2, 1000)) {
        return res.status(400).json({message: "Password must be at least 6 characters"})
      }

      const encryptPassword = await bcrypt.hash(password, 12);

      const userName =  firstName + lastName;
      const validatedUserName = await validateUsername(userName)
      
      const user = await new User({
        firstName,
        lastName,
        password: encryptPassword,
        email,
        username: validatedUserName,
        birthYear,
        birthMonth,
        birthDay,
        gender
      }).save();

      const verifyUserEmail = generateToken({ id: user._id}, '30m')
      const url = `${process.env.BASE_URL}/activate/${verifyUserEmail}`
      sendVerificationEmail(user.email, user.firstName, url )
      
      const token = generateToken({ id: user._id}, '24h')
      res.json({
        message: `Account created successfully! Please check your email to activate the account`,
        token,
        id: user._id,
        username: user.username,
        picture: user.picture,
        firstName: user.firstName,
        lastName: user.lastName,
        verified: user.verified
      })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
};
