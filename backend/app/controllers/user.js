/* User controller */

var mongoose = require('mongoose');
var User = require('../models/user');
var History = require('../models/history');
var Event = require('../models/event');

module.exports = {
  listAll: (req, res) => {
    User.find({}, null, { sort: { displayName: 1 } })
      .then(data => {
        return res.json(data);
      })
      .catch(error => {
        console.error(error);
        return res.sendStatus(500);
      });
  },

  getInfosById: (req, res) => {
    console.log(req.params.uid);
    User.findOne({ uid: req.params.uid })
      .then(data => {
        return res.json(data);
      })
      .catch(error => {
        console.error(error);
        return res.sendStatus(500);
      });
  },

  getOwnInfos: (req, res) => {
    return res.json(req.user);
  },

  updateOwnInfos: (req, res) => {
    // FIXME: Validation of the data ?
    User.findOneAndUpdate(
      { uid: req.user.uid },
      { $set: req.body },
      { new: false }
    )
      .then(user => {
        return res.json(user);
      })
      .catch(error => {
        console.error(error);
        return res.sendStatus(500);
      });
  },

  getOwnHistory: (req, res) => {
    // FIXME: remove this when fixed
    User.find({ uid: { $ne: req.user.uid } })
      .then(data => {
        return res.json(data);
      })
      .catch(error => {
        console.error(error);
        return res.sendStatus(500);
      });

    /*
    History.find({ user_id: req.uid })
      .then(data => {
        return res.json(data);
      })
      .catch(error => {
        console.error(error);
        return res.sendStatus(500);
      });
      */
  }
};
