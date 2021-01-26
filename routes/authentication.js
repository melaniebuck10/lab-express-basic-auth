const express = require('express');
const bcryptjs = require('bcryptjs');

const User = require('./../models/user');

const router = new express.Router();

router.get('/sign-up', (req, res, next) => {
  res.render('sign-up');
});

router.post('/sign-up', (req, res, next) => {
  const data = req.body;

  User.findOne({
    username: data.username
  })
  .then(user => {
    if(user) {
      throw new Error('This username already exists');
    } else {
      return bcryptjs.hash(data.password, 10);
    }
  })
  .then(passwordHashAndSalt => {
    return User.create({
      username: data.username,
      passwordHashAndSalt: data.passwordHashAndSalt
    });
  })
  .then(user => {
    req.session.userId = user._id;
    res.redirect('/profile');
  })
  .catch(error => {
    next(error);
  });
});

module.exports = router;