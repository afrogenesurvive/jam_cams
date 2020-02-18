const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chatSchema = new Schema({
  date: {type: Date},
  time: {type: String},
  type: {type: String},
  senderUser: {type: Schema.Types.ObjectId,ref: 'User'},
  senderModel: {type: Schema.Types.ObjectId,ref: 'Model'},
  receiverUser: {type: Schema.Types.ObjectId,ref: 'User'},
  receiverModel: {type: Schema.Types.ObjectId,ref: 'Model'},
  message: {type: String},
  show: {type: Schema.Types.ObjectId,ref: 'Show'}
},
  { timestamps: true }
);

module.exports = mongoose.model('Chat', chatSchema);
