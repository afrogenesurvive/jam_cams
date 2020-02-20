const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  date: {type: Date},
  time: {type: String},
  type: {type: String},
  content: {type: Schema.Types.ObjectId,ref: 'Content'},
  user: {type: Schema.Types.ObjectId,ref: 'User'},
  model: {type: Schema.Types.ObjectId,ref: 'Model'},
  comment: {type: String},
  parent: {type: Schema.Types.ObjectId,ref: 'Comment'},
  children: [{type: Schema.Types.ObjectId,ref: 'Comment'}]
},
  { timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
