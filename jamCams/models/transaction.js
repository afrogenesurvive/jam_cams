const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const transactionSchema = new Schema({
  date: {type: Date},
  time: {type: String},
  type: {type: String},
  sender: {
    role: {type: String},
    username: {type: String},
    ref: {type: ObjectId}
  },
  receiver: {
    role: {type: String},
    username: {type: String},
    ref: {type: ObjectId}
  },
  amount: {type: Number},
  description: {type: String},
  show: {type: Schema.Types.ObjectId,ref: 'Show'}
},
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
