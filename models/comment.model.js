const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentModel = new Schema({
    comment : {
        type : String,
        required : true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },    
    commentedOn : {
        type : Date,
        default: Date.now
    },
    commentLikes: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
    ],
    itemId : String
})

const comment = mongoose.model("Comment", commentModel);
module.exports = comment