const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DataLoader = require('dataloader');

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
      const messages = await Message.find({});
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

      const message = await Message.findOneAndUpdate({_id: args.messageId},{read: true},{new: true});
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

      let senderUserId = null;
      let senderModelId = null;
      let reciverUserId = null;
      let reciverModelId = null;

      if (args.sender = "user") {
        senderUserId = args.senderId;
      }
      if (args.sender = "model") {
        senderModelId = args.senderId
      }

      if (args.reciever = "user") {
        recieverUserId = args.recieverId;
      }
      if (args.reciever = "model") {
        recieverModelId = args.recieverId
      }

      let senderUser = await User.findById({_id: senderUserId});
      let senderModel = await Model.findById({_id: senderModelId});
      let reciverUser = await User.findById({_id: reciverUserId});
      let reciverModel = await Model.findById({_id: reciverModelId});

      const message = new Message({
        date: args.messageInput.date,
        time: args.messageInput.time,
        type: args.messageInput.type,
        subject: args.messageInput.subject,
        senderUser: senderUser,
        senderModel: senderModel,
        receiverUser: reciverUser,
        receiverModel: reciverModel,
        message: args.messageInput.message,
        read: false,
      });

      const result = await message.save();

        // write to sender and reciver here??

      return {
        ...result._doc,
        _id: result.id,
        date: result.date,
        time: result.time,
        type: result.type,
        subject: result.subject,
        senderUser: result.senderUser,
        senderModel: result.senderModel,
        receiverUser: result.receiverUser,
        receiverModel: result.receiverModel,
        message: result.message,
      };
    } catch (err) {
      throw err;
    }
  }
};
