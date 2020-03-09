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
  getContentId: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const content = await Content.findById(args.contentId);

        return {
            ...user._doc,
            _id: user.id,
            name: user.name
        };
    } catch (err) {
      throw err;
    }
  },
  getContentField: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const resolverField = args.field;
      const resolverQuery = args.query;
      const query = {[resolverField]:resolverQuery};
      const contents = await Content.find(query)

      return contents.map(content => {
        return transformContent(content);

      });
    } catch (err) {
      throw err;
    }
  },
  getContentCreator: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const creator = await Model.findById({_id: args.creatorId})
      const contents = await Content.find({creator: creator})

      return contents.map(content => {
        return transformContent(content);

      });
    } catch (err) {
      throw err;
    }
  },
  getContentModel: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const model = await Model.findById({_id: args.modelId})
      const contents = await Content.find({models: model})

      return contents.map(content => {
        return transformContent(content);

      });
    } catch (err) {
      throw err;
    }
  },
  getContentTags: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const tags = args.tags;
      const contents = await Content.find({'tags': {$all: tags}});

      return contents.map(content => {
        return transformContent(content);
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
        }},{new: true, useFindAndModify: false});

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
          creator: content.creator,
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
      const model = await Content.findOneAndUpdate({_id:args.contentId},query,{new: true, useFindAndModify: false})

      return {
        ...content._doc,
        _id: content.id,
        date: content.date,
      };
    } catch (err) {
      throw err;
    }
  },
  addContentTags: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const tags = args.contentInput.tags;
      const splitTags = tags.split(",");
      const content = await Content.findOneAndUpdate({_id:args.contentId},{$addToSet: { tags: {$each: splitTags} }},{new: true, useFindAndModify: false})
        return {
          ...content._doc,
          _id: content.id,
          date: content.date,
        };
    } catch (err) {
      throw err;
    }
  },
  addContentModel: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const model = await Model.findById({_id: args.modelId});
      const content = await Content.findOneAndUpdate({_id:args.contentId},{$addToSet: { models: model }},{new: true, useFindAndModify: false})
        return {
          ...content._doc,
          _id: content.id,
          date: content.date,
        };
    } catch (err) {
      throw err;
    }
  },
  addContentComment: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const comment = await Comment.findById({_id: args.commentId});
      const content = await Content.findOneAndUpdate({_id:args.contentId},{$addToSet: { comments: comment }},{new: true, useFindAndModify: false})
        return {
          ...content._doc,
          _id: content.id,
          date: content.date,
        };
    } catch (err) {
      throw err;
    }
  },
  addContentLikes: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const user = await User.findById({_id: args.userId});
      const like = {
        date: new Date(),
        user: user
      };
      const likeCountContent = await Content.findById({_id: args.contentId});
      const likeCount = likeCountContent.likeCount;
      const newCount = likeCount+1;
      const content = await Content.findOneAndUpdate({_id:args.contentId},{$addToSet: { likes: like }, likeCount: newCount },{new: true, useFindAndModify: false})
        return {
          ...content._doc,
          _id: content.id,
          date: content.date,
        };
    } catch (err) {
      throw err;
    }
  },
  addContentViews: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const viewCountContent = await Content.findById({_id: args.contentId});
      const viewCount = viewCountContent.viewCount;
      const newCount = viewCount+1;
      const content = await Content.findOneAndUpdate({_id:args.contentId},{ viewCount: newCount},{new: true, useFindAndModify: false})
        return {
          ...content._doc,
          _id: content.id,
          date: content.date,
        };
    } catch (err) {
      throw err;
    }
  },
  deleteContentTags: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const tags = args.tags;
        const content = await Content.findOneAndUpdate({_id:args.contentId},{$pull: { tags: tags }},{new: true, useFindAndModify: false});
        // const user = await Content.findOneAndUpdate({_id:args.userId},{$pull: { interest: { date: new Date(attendanceDate) }}},{new: true, useFindAndModify: false})

        return {
          ...content._doc,
          _id: content.id,
          date: content.date,
        };
    } catch (err) {
      throw err;
    }
  },
  deleteContentComment: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const comment = await Comment.findById({_id: args.commentId});
        const content = await Content.findOneAndUpdate({_id:args.contentId},{$pull: { tags: tags }},{new: true, useFindAndModify: false});
        // const user = await Content.findOneAndUpdate({_id:args.userId},{$pull: { interest: { date: new Date(attendanceDate) }}},{new: true, useFindAndModify: false})

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
        ],
        viewCount: 0,
        likes: [],
        likeCount: 0,
        comments: [],
        tags: [""],
      });

      const result = await content.save();
      const updateCreator = await Model.findOneAndUpdate({_id: args.creatorId},{$addToSet:{content: content}},{new: true, useFindAndModify: false})

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
        creator: result.creator,
        models: result.models
      };
    } catch (err) {
      throw err;
    }
  }
};
