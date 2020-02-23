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
      let sender = null;
      let reciever = null;
      let senderRole = args.senderRole;
      sender = await mongoose.model(senderRole).findById({_id: args.senderId});
      let receiverRole = args.receiverRole;
      receiver = await mongoose.model(receiverRole).findById({_id: args.receiverId});

      const transaction = new Transaction({
        date: args.transactionInput.date,
        time: args.transactionInput.time,
        type: args.transactionInput.type,
        sender: {
          role: senderRole,
          ref: sender
        },
        receiver: {
          role: receiverRole,
          ref: receiver
        },
        amount: args.transactionInput.amount,
        description: args.transactionInput.description,
      });

      const result = await transaction.save();

      const updateSender = await mongoose.model(senderRole).findOneAndUpdate({_id: args.senderId},{$addToSet: {transactions: transaction}},{new: true});
      const updateReceiver = await mongoose.model(receiverRole).findOneAndUpdate({_id: args.receiverId},{$addToSet: {transactions: transaction}},{new: true});

      return {
        ...result._doc,
        _id: result.id,
        date: result.date,
        time: result.time,
        type: result.type,
        subject: result.subject,
        sender: result.sender,
        receiver: result.receiver,
        amount: result.amount,
        description: result.description,
      };
    } catch (err) {
      throw err;
    }
  }
};
