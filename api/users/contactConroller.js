const jwt = require("jsonwebtoken");
const User = require("../models/User");
const secret = "mysecretsshhh"; //read from file
const bcrypt = require("bcrypt");

const saltRounds = 10;

const contactController = {

  addContact: async (req, res) => {
    const userName = req.params.userName;
    const contact = req.body;
    console.log(userName);
    console.log(contact)
    const newContact = { ...contact }
    console.log(newContact);
    User.findOneAndUpdate({ email: userName },
      { $push: { contacts: newContact } }, { returnOriginal: false },
      function (err, user) {
        console.log("updatedUser" + user)
        if (err) {
          console.error(err);
          res.status(500).json({
            error: "Internal error please try again",
          });
        }
        if (res) {
          res.status(200).json({
            status: "success",
          });
        }

      }

    )
  },
  getContacts: async (req, res) => {
    const userName = req.params.userName;
    User.findOne({ email: userName },
      function (err, user) {
        console.log("userFound" + user)
        if (err) {
          console.error(err);
          res.status(500).json({
            error: "Internal error please try again",
          });
        }
        if (res) {
          res.status(200).json(user.contacts);
        }

      }

    )
  },
  getContact: async (req, res) => {
    const userName = req.params.userName;
    User.findOne({ email: userName },
      function (err, user) {
        console.log("userFound" + user)
        if (err) {
          console.error(err);
          res.status(500).json({
            error: "Internal error please try again",
          });
        }
        if (res) {
          res.status(200).json(user.contacts);
        }

      }

    )
  },
  updateContact: async (req, res) => {
    const userName = req.params.userName;
    User.updateOne({ email: userName },
      function (err, user) {
        console.log("userFound" + user)
        if (err) {
          console.error(err);
          res.status(500).json({
            error: "Internal error please try again",
          });
        }
        if (res) {
          res.status(200)
        }

      }

    )
  },
  deleteContact: async (req, res) => {
    const userName = req.params.userName;
    const contactId = req.params.id;
    User.findOne({ email: userName },
      function (err, user) {
        console.log("contactDeleted" + JSON.stringify(user))
        if (err) {
          console.error(err);
          res.status(500).json({
            error: "Internal error please try again",
          });
        }
        if (user) {
          
          res.status(200).json(user.contacts);
        }

      }

    )
  },
  changeStatus: async (req, res) => {
    const userName = req.params.userName;
    User.findOne({ email: userName },
      function (err, user) {
        console.log("userFound" + user)
        if (err) {
          console.error(err);
          res.status(500).json({
            error: "Internal error please try again",
          });
        }
        if (res) {
          res.status(200).json(user.contacts);
        }

      }

    )
  }
};

module.exports = contactController;
