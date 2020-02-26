const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DataLoader = require('dataloader');
const mongoose = require('mongoose');

const User = require('../../models/user');
const Model = require('../../models/model');
const Content = require('../../models/content');
const Show = require('../../models/show');
const Comment = require('../../models/comment');
const Message = require('../../models/message');
const Chat = require('../../models/chat');
const Transaction = require('../../models/transaction');
const util = require('util');

const { transformMessage } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');


module.exports = {
  messages: async (args, req) => {
    // console.log(`
    //  messages...args: ${util.inspect(args)},
    //   isAuth: ${req.isAuth},
    //   `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const messages = await Message.find({})
      // .populate('sender')
      // .populate('receiver');
      // .populate({path: 'sender', model: User})
      // .populate({path: 'receiver', model: Model});
      return messages.map(message => {
        return transformMessage(message,);
      });
    } catch (err) {
      throw err;
    }
  },
  updateMessageRead: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const message = await Message.findOneAndUpdate({_id: args.messageId},{read: true},{new: true, useFindAndModify: false});
        return {
          ...message._doc,
          _id: message.id,
          date: message.date,
          time: message.time,
        };
    } catch (err) {
      throw err;
    }
  },
  deleteMessage: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {


      const message = await Message.findByIdAndRemove(args.messageId);
        return {
          ...message._doc,
          _id: message.id,
          date: message.date,
          time: message.time,
        };
    } catch (err) {
      throw err;
    }
  },
  createMessage: async (args, req) => {

    try {

      let sender = null;
      let reciever = null;
      let senderRole = args.senderRole;
      sender = await mongoose.model(senderRole).findById({_id: args.senderId});
      let receiverRole = args.receiverRole;
      receiver = await mongoose.model(receiverRole).findById({_id: args.receiverId});

      const message = new Message({
        date: args.messageInput.date,
        time: args.messageInput.time,
        type: args.messageInput.type,
        subject: args.messageInput.subject,
        sender: {
          role: senderRole,
          ref: sender
        },
        receiver: {
          role: receiverRole,
          ref: receiver
        },
        message: args.messageInput.message,
        read: false,
      });

      const result = await message.save();

      const updateSender = await mongoose.model(senderRole).findOneAndUpdate({_id: args.senderId},{$addToSet: {messages: message}},{new: true, useFindAndModify: false});
      const updateReceiver = await mongoose.model(receiverRole).findOneAndUpdate({_id: args.receiverId},{$addToSet: {messages: message}},{new: true, useFindAndModify: false});

      return {
        ...result._doc,
        _id: result.id,
        date: result.date,
        time: result.time,
        type: result.type,
        subject: result.subject,
        sender: result.sender,
        receiver: result.receiver,
        message: result.message,
      };
    } catch (err) {
      throw err;
    }
  }
};
