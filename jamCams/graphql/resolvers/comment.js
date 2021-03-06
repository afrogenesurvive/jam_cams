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

const { transformComment } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');


module.exports = {
  comments: async (args, req) => {
    // console.log(`
    //  comments...args: ${util.inspect(args)},
    //   isAuth: ${req.isAuth},
    //   `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const comments = await Comment.find({});
      return comments.map(comment => {
        return transformComment(comment,);
      });
    } catch (err) {
      throw err;
    }
  },
  setCommentParent: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const parent = await Comment.findById({_id: args.parentId});
      const comment = await Comment.findOneAndUpdate({_id: args.commentId},{parent: parent},{new: true, useFindAndModify: false});
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
  addCommentChild: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const child = await Comment.findById({_id: args.childId});
      const comment = await Comment.findOneAndUpdate({_id: args.commentId},{$addToSet: {children: child}},{new: true, useFindAndModify: false});
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
  deleteComment: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const preComment = await Comment.findById({_id: args.commentId});
      const children = preComment.children.filter(x=> x._id);
      const parent = preComment.parent;
      const updateParent = await Comment.findOneAndUpdate({_id: parent._id},{$pull: { children: preComment }},{new: true, useFindAndModify: false});

      // send list of child ids to pocket vars. delete all on all comments load OR
      // send to front end and delete in frontend bg

      const comment = await Comment.findByIdAndRemove(args.commentId);
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
  createComment: async (args, req) => {

    try {

      let updateParent = null;
      const content = await Content.findById({_id: args.contentId});
      let parent = parent = await Content.findById({_id: args.parentId});
      let role = args.authorRole;

      author = await mongoose.model(role).findById({_id: args.authorId});

      const comment = new Comment({
        date: args.commentInput.date,
        time: args.commentInput.time,
        type: args.commentInput.type,
        content: content,
        author: {
          role: role,
          ref: author
        },
        comment: args.commentInput.comment,
        parent: parent,
        children: [],
      });

      updateParent = await Comment.findOneAndUpdate({_id: parentId},{$addToSet: {children: comment}},{new: true, useFindAndModify: false})

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
  },
  createRootComment: async (args, req) => {

    try {

      const content = await Content.findById({_id: args.contentId});
      let role = args.authorRole;

      author = await mongoose.model(role).findById({_id: args.authorId});

      const comment = new Comment({
        date: args.commentInput.date,
        time: args.commentInput.time,
        type: args.commentInput.type,
        content: content,
        author: {
          role: role,
          ref: author
        },
        comment: args.commentInput.comment,
        parent: parent,
        children: [],
      });

      const result = await comment.save();
      const updateCommenter = await mongoose.model(role).findOneAndUpdate({_id: args.authorId},{$addToSet:{comments: comment}},{new: true, useFindAndModify: false})

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
