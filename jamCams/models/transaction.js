const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const transactionSchema = new Schema({
  date: {type: Date},
  time: {type: String},
  type: {type: String},
  senderUser: {type: Schema.Types.ObjectId,ref: 'User'},
  senderModel: {type: Schema.Types.ObjectId,ref: 'Model'},
  receiverUser: {type: Schema.Types.ObjectId,ref: 'User'},
  recieverModel: {type: Schema.Types.ObjectId,ref: 'Model'},
  amount: {type: Number},
  description: {type: String},
  show: {type: Schema.Types.ObjectId,ref: 'Show'}
},
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
