const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../keys");

const validateRegisterInput = require("../validations/register.validate");
//refrence to mongoose schema
const UserModel = require("../models/users.model");

// @desc registers new user
module.exports.RegisterUser = (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  UserModel.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      errors.email = "Email already exist";
      return res.status(400).json(errors);
    } else {
      bcrypt.hash(req.body.password, 10, (error, hash) => {
        if (error) {
          errors.password = "Problem creating the user";
          return res.status(400).json(errors);
        } else {
          const newUser = new UserModel({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            password: hash,
          });
          newUser
            .save()
            .then((user) =>
              res.status(200).json({ message: "Signup successful", user })
            )
            .catch((error) => console.log(error));
        }
      });
    }
  });
};

//@desc login a user
module.exports.LoginUser = (req, res) => {
  UserModel.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ message: "Email or Password is incorrect" });
      } else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
          if (err)
            return res
              .status(401)
              .json({ message: "Email or Password is incorrect" });
          else if (result) {
            const payload = {
              id: user._id,
              name: user.name,
              address: user.address,
              email: user.email,
            }; //jwt payload
            //jwt signin token
            jwt.sign(
              payload,
              db.secret,
              {
                expiresIn: 604800, //1week
              },
              (error, token) => {
                if (error) {
                  console.log(error);
                  return res.status(500).json(error);
                }
                return res.status(200).json({
                  success: true,
                  message: "Authentic",
                  token: `Bearer ${token}`,
                });
              }
            );
            // return res.status(200).json({ message: "Authentic" });
          } else
            return res
              .status(401)
              .json({ message: "Email or Password is incorrect" });
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};

//@desc get list of all users
module.exports.AllUsers = (req, res) => {
  UserModel.find()
    .then((users) => {
      const errors = {};
      if (!users || users.length < 1) {
        errors.NoUsers = "There are no users";
        return res.status(404).json(errors);
      } else return res.status(200).json(users);
    })
    .catch((error) => {
      console.log("error all users", error);
      res.status(500).json(error);
    });
};

//@desc delete a user
module.exports.DeleteUser = (req, res) => {
  UserModel.remove({ _id: req.params.userId })
    .exec()
    .then((response) => {
      res.status(200).json({ message: "User Deleted" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
};
