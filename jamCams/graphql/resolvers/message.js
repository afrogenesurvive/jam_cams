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

      const hasChildren = await Message.findById({_id: args.commentId});
      if (JSON.stringify(hasChildren.children) !== "[]") {
        hasChildren.children.map(child => {
          let deletedChild = await Message.findByIdAndRemove(child._id);
        });
      }
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

      let updateParent = null;
      let user = null;
      let model = null;
      const content = await Content.findById({_id: args.contentId});
      let parent = null;

      if (args.userId !== null || args.userId !=== undefined) {
        user = await User.findById({_id: args.userId});
      }
      if (args.modelId !== null || args.modelId !=== undefined) {
        model = await Model.findById({_id: args.modelId});
      }
      if (args.parentId !== null || args.parentId !=== undefined) {
        parent = await Content.findById({_id: args.parentId});
      }
      const comment = new Message({
        date: args.commentInput.date,
        time: args.commentInput.time,
        type: args.commentInput.type,
        content: content,
        user: user,
        model: model,
        comment: args.commentInput.comment,
        parent: parent,
      });

      if (comment.parent !== null) {
        updateParent = await Message.findOneAndUpdate({_id: parent._id},{$addToSet: {children: comment}},{new: true})
      }

      const result = await comment.save();

      return {
        ...result._doc,
        _id: result.id,
        date: result.date,
        time: result.time,
        type: result.type,
        content: result.content,
        user: result.user,
        model: result.model,
        comment: result.comment,
        parent: result.parent,
      };
    } catch (err) {
      throw err;
    }
  }
};
