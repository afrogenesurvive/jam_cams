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
  deleteMessage: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      
      const comment = await Message.findByIdAndRemove(args.commentId);
        return {
          ...comment._doc,
          _id: comment.id,
          date: comment.date,
          time: comment.time,
        };
    } catch (err) {
      throw err;
    }
  },
  createMessage: async (args, req) => {

    try {



      const message = new Message({
        date: args.messageInput.date,
        time: args.messageInput.time,
        type: args.messageInput.type,
        subject: args.messageInput.subject,
        senderUser:
        senderModel:
        receiverUser:
        receiverModel:
        message: args.messageInput.message
      });

      const result = await message.save();

      return {
        ...result._doc,
        _id: result.id,
        date: result.date,

      };
    } catch (err) {
      throw err;
    }
  }
};
