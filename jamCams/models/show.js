const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const showSchema = new Schema({
  type: {type: String},
  title: {type: String},
  description: {type: String},
  status: {type: String},
  scheduledDate: {type: Date},
  scheduledTime: {type: String},
  airedDate: {type: Date},
  airedTime: {type: String},
  creator: {type: Schema.Types.ObjectId,ref: 'Model'},
  models: [{type: Schema.Types.ObjectId,ref: 'Model'}],
  viewers: [{type: Schema.Types.ObjectId,ref: 'User'}],
  chat: [{type: Schema.Types.ObjectId,ref: 'Chat'}],
  tags: [
    {type: Date}
  ]
},
  { timestamps: true }
);

module.exports = mongoose.model('Show', showSchema);
