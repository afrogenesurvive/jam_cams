const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contentSchema = new Schema({
  date: {type: Date},
  type: {type: String},
  title: {type: String},
  file: {
    name: {type: String},
    type: {type: String},
    size: {type: String},
    path: {type: String},
  },
  creator: {type: Schema.Types.ObjectId,ref: 'Model'},
  models: [
    {type: Schema.Types.ObjectId,ref: 'Model'}
  ],
  viewCount: {type: Number},
  likes: [
    {
      date: {type: Date},
      user: {type: Schema.Types.ObjectId,ref: 'User'}
    }
  ],
  likeCount: {type: Number},
  comments: [
    {type: Schema.Types.ObjectId,ref: 'Comment'}
  ],
  tags: [
    {type: String}
  ]
},
  { timestamps: true }
);

module.exports = mongoose.model('Content', contentSchema);
