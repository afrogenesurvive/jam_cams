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

const { transformTransaction } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');


module.exports = {
  transactions: async (args, req) => {
    // console.log(`
    //  messages...args: ${util.inspect(args)},
    //   isAuth: ${req.isAuth},
    //   `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const transactions = await Transaction.find({});
      return transactions.map(transaction => {
        return transformTransaction(transaction,);
      });
    } catch (err) {
      throw err;
    }
  },
  deleteTransaction: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {


      const transaction = await Transaction.findByIdAndRemove(args.transactionId);
        return {
          ...transaction._doc,
          _id: transaction.id,
          date: transaction.date,
          time: transaction.time,
        };
    } catch (err) {
      throw err;
    }
  },
  createTransaction: async (args, req) => {

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

      const transaction = new Transaction({
        date: args.transactionInput.date,
        time: args.transactionInput.time,
        type: args.transactionInput.type,
        senderUser: senderUser,
        senderModel: senderModel,
        receiverUser: reciverUser,
        receiverModel: reciverModel,
        amount: args.transactionInput.amount,
        description: args.transactionInput.description,
      });

      const result = await transaction.save();

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
        amount: result.amount,
        description: result.description,
      };
    } catch (err) {
      throw err;
    }
  }
};
