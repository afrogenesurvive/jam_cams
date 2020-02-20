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

const { transformContent } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');


module.exports = {
  content: async (args, req) => {
    // console.log(`
    //   users...args: ${util.inspect(args)},
    //   isAuth: ${req.isAuth},
    //   `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const contents = await Content.find({});
      return contents.map(content => {
        return transformContent(content,);
      });
    } catch (err) {
      throw err;
    }
  },
  updateContent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const content = await Content.findOneAndUpdate({_id:args.contentId},{
        date: args.contentInput.date,
        type: args.contentInput.type,
        title: args.contentInput.title,
        file: {
          name: args.contentInput.fileName,
          type: args.contentInput.fileType,
          size: args.contentInput.fileSize,
          path: args.contentInput.filePath
        }},{new: true});

        return {
          ...content._doc,
          _id: content.id,
          date: content.date,
          type: content.type,
          title: content.title,
          file: {
            name: content.file.name,
            type: content.file.type,
            size: content.file.size,
            path: content.file.path
          },
          creator: content.creator
          models: content.models
        };
    } catch (err) {
      throw err;
    }
  },
  updateContentField: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const resolverField = args.field;
      const resolverQuery = args.query;
      const query = {[resolverField]:resolverQuery};
      const model = await Content.findOneAndUpdate({_id:args.contentId},query,{new: true})

      return {
        ...content._doc,
        _id: content.id,
        date: content.date,
      };
    } catch (err) {
      throw err;
    }
  },
  addContentTag: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const tag = args.contentInput.tag;
      const model = await Content.findOneAndUpdate({_id:args.contentId},{$addToSet: { tags: tag }},{new: true, useFindAndModify: false})
        return {
          ...content._doc,
          _id: content.id,
          date: content.date,
        };
    } catch (err) {
      throw err;
    }
  },
  deleteContentTag: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const tag = args.contentInput.tag;
        const model = await Content.findOneAndUpdate({_id:args.contentId},{$pull: { tags: tag }},{new: true});
        // const user = await Content.findOneAndUpdate({_id:args.userId},{$pull: { interest: { date: new Date(attendanceDate) }}},{new: true})

        return {
          ...content._doc,
          _id: content.id,
          date: content.date,
        };
    } catch (err) {
      throw err;
    }
  },
  deleteContent: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const content = await Content.findByIdAndRemove(args.contentId);
        return {
          ...content._doc,
          _id: content.id,
          date: content.date,
        };
    } catch (err) {
      throw err;
    }
  },
  createContent: async (args, req) => {

    try {

      const creator = await Model.findById({_id: args.creatorId});
      const content = new Content({
        date: args.contentInput.date,
        type: args.contentInput.type,
        title: args.contentInput.title,
        file: {
          name: args.contentInput.fileName,
          type: args.contentInput.fileType,
          size: args.contentInput.fileSize,
          path: args.contentInput.filePath
        },
        creator: creator,
        models: [
          creator
        ]
      });

      const result = await content.save();

      return {
        ...result._doc,
        _id: result.id,
        date: result.date,
        type: result.type,
        title: result.title,
        file: {
          name: result.file.name,
          type: result.file.type,
          size: result.file.size,
          path: result.file.path
        },
        creator: result.creator
        models: result.models
      };
    } catch (err) {
      throw err;
    }
  }
};
