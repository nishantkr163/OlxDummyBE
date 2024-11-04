const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phoneNumber : {
        type : Number,
        required : true
    },
    state: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
    },
    selling: [
        {
            type: Schema.Types.ObjectId,
            ref: 'items'
        }
    ],
    sold: [
        {
            type: Schema.Types.ObjectId,
            ref: 'items'
        }
    ],
    interestedItem: [
        {
            type: Schema.Types.ObjectId,
            ref: 'items'
        }
    ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
