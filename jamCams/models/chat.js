const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const chatSchema = new Schema({
  date: {type: Date},
  time: {type: String},
  type: {type: String},
  sender: {
    role: {type: String},
    ref: {type: ObjectId}
  },
  receiver: {
    role: {type: String},
    ref: {type: ObjectId}
  },
  message: {type: String},
  read: {type: Boolean},
  show: {type: Schema.Types.ObjectId,ref: 'Show'}
},
  { timestamps: true }
);

module.exports = mongoose.model('Chat', chatSchema);
