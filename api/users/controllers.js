const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");

const saltRounds = 10;
const secret = fs.readFileSync(path.resolve(__dirname, "../../secret.key"));

const controllers = {
  register: (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    const user = new User({ email, password, firstName, lastName });
    user.save(function (err) {
      if (err) {
        console.log(err);
        if (err.code === 11000) {
          res.status(409).json({ error: "Email already registered!" });
        } else {
          res
            .status(500)
            .json({ error: "Error registering new user please try again..." });
        }
      } else {
        res.status(200).json({
          email: email,
          firstName: firstName,
          lastName: lastName,
        });
      }
    });
  },
  authenticate: (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email }, function (err, user) {
      if (err) {
        console.error(err);
        res.status(500).json({
          error: "Internal error please try again",
        });
      } else if (!user) {
        res.status(401).json({
          error: "Incorrect email or password",
        });
      } else {
        user.isCorrectPassword(password, function (err, same) {
          if (err) {
            res.status(500).json({
              error: "Internal error please try again",
            });
          } else if (!same) {
            res.status(401).json({
              error: "Incorrect email or password",
            });
          } else {
            // Issue token
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: "1h",
            });
            res
              .cookie("token", token)
              .status(200)
              .json({ status: "success", token: token });
          }
        });
      }
    });
  },
  updateUser: async (req, res) => {
    const email = req.email;
    let { firstName, lastName, password } = req.body;
    const lastUpdate = Date.now();
    if (password) {
      bcrypt.hash(password, saltRounds, function (err, hashedPassword) {
        if (err) {
          console.error(err);
          res.status(500).json({
            error: "Internal error please try again",
          });
        } else {
          const update = {
            firstName,
            lastName,
            password: hashedPassword,
            lastUpdate,
          };
          controllers.update(res, email, update);
        }
      });
    } else {
      const update = { firstName, lastName, lastUpdate };
      this.update(res, update);
    }
  },
  update: async (res, email, update) => {
    Object.keys(update).forEach(
      (key) => update[key] === undefined && delete update[key]
    );
    try {
      await User.updateOne({ email }, update);
      res.status(200).json({ status: "success" });
    } catch (err) {
      console.log(err);
      res.status(401).json({
        error: "Internal error please try again",
      });
    }
  },
  deleteUser: async (req, res) => {
    const email = req.email;
    try {
      const result = await User.remove({ email });
      res.status(200).json({ status: "success" });
    } catch (err) {
      console.log(err);
      res.status(401).json({
        error: "Internal error please try again",
      });
    }
  },
  checkToken: async (req, res) => {
    res.status(200).json({ status: "success" });
  },
};

module.exports = controllers;
