const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  date: {type: Date},
  time: {type: String},
  type: {type: String},
  subject: {type: String},
  senderUser: {type: Schema.Types.ObjectId,ref: 'User'},
  senderModel: {type: Schema.Types.ObjectId,ref: 'Model'},
  receiverUser: {type: Schema.Types.ObjectId,ref: 'User'},
  receiverModel: {type: Schema.Types.ObjectId,ref: 'Model'},
  message: {type: String},
  read: {type: Boolean}
},
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
