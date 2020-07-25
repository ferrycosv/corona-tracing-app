const User = require("../models/User");

const controllers = {
  getList: (req, res) => {
    const email = req.email;
    User.findOne({ email }, function (err, user) {
      if (err) {
        console.error(err);
        res.status(500).json({
          error: "Internal error please try again",
        });
      } else if (!user) {
        res.status(401).json({
          error: "Incorrect email",
        });
      } else {
        res.status(200).json({
          email: user.email,
          contacts: user.contacts,
        });
      }
    });
  },
  updateList: async (req, res) => {
    const email = req.email;
    let { contacts } = req.body;
    try {
      await User.updateOne({ email }, { contacts });
      res.status(200).json({ status: "success" });
    } catch (err) {
      console.log(err);
      res.status(401).json({
        error: "Internal error please try again",
      });
    }
  },
};

module.exports = controllers;
