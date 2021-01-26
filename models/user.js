const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
    username: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 30,
        lowercase: true,
        pattern: /^[a-z0-9]+$/,

    },
passwordHashAndSalt: {
    type: String,
    required: true
}
});

const User = mongoose.model('User', userSchema)

module.exports = User;