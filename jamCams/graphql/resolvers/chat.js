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

const { transformChat } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');


module.exports = {
  chats: async (args, req) => {
    // console.log(`
    //  messages...args: ${util.inspect(args)},
    //   isAuth: ${req.isAuth},
    //   `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const chats = await Chat.find({});
      return chats.map(chat => {
        return transformChat(chat,);
      });
    } catch (err) {
      throw err;
    }
  },
  updateChatRead: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const chat = await Chat.findOneAndUpdate({_id: args.chatId},{read: true},{new: true});
        return {
          ...chat._doc,
          _id: chat.id,
          date: chat.date,
          time: chat.time,
        };
    } catch (err) {
      throw err;
    }
  },
  deleteChat: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {


      const chat = await Chat.findByIdAndRemove(args.chatId);
        return {
          ...chat._doc,
          _id: chat.id,
          date: chat.date,
          time: chat.time,
        };
    } catch (err) {
      throw err;
    }
  },
  createChat: async (args, req) => {

    try {

      let sender = null;
      let reciever = null;
      let senderRole = args.senderRole;
      sender = await mongoose.model(senderRole).findById({_id: args.senderId});
      let receiverRole = args.receiverRole;
      receiver = await mongoose.model(receiverRole).findById({_id: args.receiverId});

      const show = await Show.findById({_id: args.showId});

      const chat = new Chat({
        date: args.chatInput.date,
        time: args.chatInput.time,
        type: args.chatInput.type,
        sender: {
          role: senderRole,
          ref: sender
        },
        receiver: {
          role: receiverRole,
          ref: receiver
        },
        message: args.chatInput.message,
        read: false,
        show: show,
      });

      const result = await chat.save();

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
