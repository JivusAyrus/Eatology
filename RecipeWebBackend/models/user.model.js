
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const ShoppingList = require('./shoppingList.model')

/*
Structure of a User :

User
{
    username :      String,
    password:       String,
    favorites:      [String],
    profileImg:     Buffer,
    pref_cuisines : [String]
    email:          String,
    search_history: [String],
    shopping_list : [ShoppingList]
    phone_number:   String
}
*/

var UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        maxlength: 6
    },
    fullname: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    favourites: [String],
    profile_img: Buffer,
    pref_cuisines: [String],
    email: {
        type: String,
        match: /.+@.+/i, //Validates email ids
        unique: true,
        required: true,
    },
    search_history: [String],
    shopping_lists: [ShoppingList.schema],
    phone_number: {
        type: String,
        maxlength: 10,
        match: /^\d{10}$/,  //Validates phone number
    },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;