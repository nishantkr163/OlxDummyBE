const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
require("dotenv").config();

exports.addNewUser = async (req, res, next) => {
  try {
    const { name, email, password, city, phoneNumber, state, profileImage } =
      req.body;

    let existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    } else {
      bcrypt.hash(password, 8, async (err, hash) => {
        if (err) {
          return res
            .status(400)
            .json({ message: "Unable to hash your password." });
        } else {
          const newUser = new User({
            name,
            email,
            password: hash,
            city,
            phoneNumber,
            state,
            profileImage,
            selling: [],
            sold: [],
            interestedItem: [],
          });

          console.log(newUser);
          try {
            await newUser.save();
            return res
              .status(200)
              .send({ message: "Account created successfully!" });
          } catch (error) {
            return res
              .status(400)
              .json({ message: "Unable to create account." });
          }
        }
      });
    }
  } catch (error) {
    return res.status(400).json({ message: "Unable to create account." });
  }
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    console.log(userExists);
    if (userExists) {
      const passwordMatch = await bcrypt.compare(password, userExists.password);
      console.log(passwordMatch);

      if (passwordMatch) {
        const token = jwt.sign(
          { userId: userExists._id },
          process.env.JWT_SECRET_KEY,
          { expiresIn: "1h" }
        );

        res
          .status(200)
          .json({ message: `Welcome back ${userExists.name}`, token: token });
      } else {
        return res.status(400).json({ message: "Invalid password, try again" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "User with such credentials dosen't exists" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Network error, please try again later" });
  }
};
