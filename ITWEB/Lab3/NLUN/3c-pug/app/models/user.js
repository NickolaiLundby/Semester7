'use strict';

// Module dependencies

const mongoose = require('mongoose');
const crypto = require('crypto');
const Schema = mongoose.Schema;

// Extern authentication types

const authTypes = ['github', 'google'];

// User schema

const UserSchema = new Schema({
    name: { type: String, default: '' },
    username: { type: String, default: '' },
    email: { type: String, default: '' },
    provider: { type: String, default: '' },
    encryptedpassword: { type: String, default: '' },
    authToken: { type: String, default: '' },
    github: {},
    google: {}
});

// Validations for signing up
UserSchema.path('name').validate(function(name) {
    if (this.externToken()) return true;
    return name.length;
}, 'Invalid name');

// Maybe validate that username isnt taken?
UserSchema.path('username').validate(function(username){
    if (this.externToken()) return true;
    return username.length;
}, 'Invalid username');

// Maybe validate that email isnt taken?
UserSchema.path('email').validate(function(email){
    if (this.externToken()) return true;
    return email.length;
}, 'Invalid email');

UserSchema.path('encryptedpassword').validate(function(encryptedpassword){
   if (this.externToken()) return true;
   return encryptedpassword.length; 
}, 'Invalid password');


// Methods

UserSchema.methods = {

    // If using extern token, OAuth, sign up validation is not required
    externToken: function() {
        return ~authTypes.indexOf(this.provider);
    },

    // Encrypt the plaintext password using sha1
    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1')
                .update(password)
                .digest(hex)
        } catch (err) {
            return '';
        }
    },

    // To authenticate, check if, once the plaintext password is encrypted is similar to the encrypted password.
    authenticate: function(plainpassword) {
        return this.encryptPassword(plainpassword) === this.encryptedpassword;
    }
};

mongoose.model('User', UserSchema);