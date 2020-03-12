const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const messageSchema = new Schema({
  date: {type: Date},
  time: {type: String},
  type: {type: String},
  subject: {type: String},
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
  message: {type: String},
  read: {type: Boolean}
},
  { timestamps: true }
);

module.exports = mongoose.model('Message', messageSchema);
