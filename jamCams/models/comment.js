const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const commentSchema = new Schema({
  date: {type: Date},
  time: {type: String},
  type: {type: String},
  content: {type: Schema.Types.ObjectId,ref: 'Content'},
  author: {
    role: {type: String},
    username: {type: String},
    ref: {type: ObjectId}
  },
  comment: {type: String},
  parent: {type: Schema.Types.ObjectId,ref: 'Comment'},
  children: [{type: Schema.Types.ObjectId,ref: 'Comment'}]
},
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
