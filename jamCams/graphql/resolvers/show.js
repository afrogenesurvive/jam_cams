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

const { transformShow } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');


module.exports = {
  shows: async (args, req) => {
    // console.log(`
    //  shows...args: ${util.inspect(args)},
    //   isAuth: ${req.isAuth},
    //   `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const shows = await Show.find({});
      return shows.map(show => {
        return transformShow(show,);
      });
    } catch (err) {
      throw err;
    }
  },
  getShowId: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const show = await Show.findById(args.showId);

      return {
        ...show._doc,
        _id: show.id,
        type: show.type,
        title: show.title
      };
    } catch (err) {
      throw err;
    }
  },
  getShowField: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const resolverField = args.field;
      const resolverQuery = args.query;
      const query = {[resolverField]:resolverQuery};
      const shows = await Show.find(query)

      return shows.map(show => {
        return transformShow(show);

      });
    } catch (err) {
      throw err;
    }
  },
  getShowCreator: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const creator = await Model.findById({_id: args.creatorId})
      const shows = await Show.find({creator: creator})

      return shows.map(show => {
        return transformShow(show);

      });
    } catch (err) {
      throw err;
    }
  },
  getShowModel: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const model = await Model.findById({_id: args.modelId})
      const shows = await Show.find({models: model})

      return shows.map(show => {
        return transformShow(show);

      });
    } catch (err) {
      throw err;
    }
  },
  getShowViewer: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const viewer = await User.findById({_id: args.viewerId})
      const shows = await Show.find({viewers: viewer})

      return shows.map(show => {
        return transformShow(show);

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
  updateShow: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const show = await Show.findOneAndUpdate({_id:args.showId},{
        type: args.showInput.type,
        title: args.showInput.title,
        description: args.showInput.description,
        status: args.showInput.status,
        scheduledDate: args.showInput.scheduledDate,
        scheduledTime: args.showInput.scheduledTime,
        airedDate: args.showInput.airedDate,
        airedTime: args.showInput.airedTime,
        endDate: args.showInput.endDate,
        endTime: args.showInput.endTime,
        length: args.showInput.length,
        },{new: true});

        return {
          ...show._doc,
          _id: show.id,
          type: show.type,
          title: show.title
        };
    } catch (err) {
      throw err;
    }
  },
  updateShowField: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const resolverField = args.field;
      const resolverQuery = args.query;
      const query = {[resolverField]:resolverQuery};
      const show = await Show.findOneAndUpdate({_id:args.showId},query,{new: true})

      return {
        ...show._doc,
        _id: show.id,
        type: show.type,
        title: show.title
      };
    } catch (err) {
      throw err;
    }
  },
  addShowTags: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const tags = args.tags;
      const show = await Show.findOneAndUpdate({_id:args.showId},{$addToSet: { tags: {$each: tags} }},{new: true, useFindAndModify: false})
        return {
          ...show._doc,
          _id: show.id,
          type: show.type,
          title: show.title
        };
    } catch (err) {
      throw err;
    }
  },
  addShowModel: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const model = await Model.findById({_id: args.modelId});
      const show = await Show.findOneAndUpdate({_id:args.showId},{$addToSet: { models: model }},{new: true, useFindAndModify: false})
        return {
          ...show._doc,
          _id: show.id,
          type: show.type,
          title: show.title
        };
    } catch (err) {
      throw err;
    }
  },
  addShowContent: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const content = await Content.findById({_id: args.contentId});
      const show = await Show.findOneAndUpdate({_id:args.showId},{$addToSet: { content: content }},{new: true, useFindAndModify: false})
        return {
          ...show._doc,
          _id: show.id,
          type: show.type,
          title: show.title
        };
    } catch (err) {
      throw err;
    }
  },
  addShowViewer: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const viewer = await User.findById({_id: args.viewerId});
      const show = await Show.findOneAndUpdate({_id:args.showId},{$addToSet: { viewers: viewer }},{new: true, useFindAndModify: false})
        return {
          ...show._doc,
          _id: show.id,
          type: show.type,
          title: show.title
        };
    } catch (err) {
      throw err;
    }
  },
  addShowChat: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const chat = await Chat.findById({_id: args.chatId});
      const show = await Show.findOneAndUpdate({_id:args.showId},{$addToSet: { chats: chat }},{new: true, useFindAndModify: false})
        return {
          ...show._doc,
          _id: show.id,
          type: show.type,
          title: show.title
        };
    } catch (err) {
      throw err;
    }
  },
  deleteShowTags: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const tags = args.tags;
        const show = await Show.findOneAndUpdate({_id:args.showId},{$pull: { tags: tags }},{new: true});
        // const user = await Show.findOneAndUpdate({_id:args.userId},{$pull: { interest: { date: new Date(attendanceDate) }}},{new: true})

        return {
          ...show._doc,
          _id: show.id,
          type: show.type,
          title: show.title
        };
    } catch (err) {
      throw err;
    }
  },
  deleteShowViewer: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const viewer = await User.findById({_id: args.viewerId});
        const show = await Show.findOneAndUpdate({_id:args.showId},{$pull: { viewers: viewer }},{new: true});
        // const user = await Show.findOneAndUpdate({_id:args.userId},{$pull: { interest: { date: new Date(attendanceDate) }}},{new: true})

        return {
          ...show._doc,
          _id: show.id,
          type: show.type,
          title: show.title
        };
    } catch (err) {
      throw err;
    }
  },
  deleteShowModel: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const model = await Model.findById({_id: args.modelId});
        const show = await Show.findOneAndUpdate({_id:args.showId},{$pull: { models: model }},{new: true});
        // const user = await Show.findOneAndUpdate({_id:args.userId},{$pull: { interest: { date: new Date(attendanceDate) }}},{new: true})

        return {
          ...show._doc,
          _id: show.id,
          type: show.type,
          title: show.title
        };
    } catch (err) {
      throw err;
    }
  },
  deleteShowContent: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const content = await Content.findById({_id: args.contentId});
        const show = await Show.findOneAndUpdate({_id:args.showId},{$pull: { contents: content }},{new: true});
        // const user = await Show.findOneAndUpdate({_id:args.userId},{$pull: { interest: { date: new Date(attendanceDate) }}},{new: true})

        return {
          ...show._doc,
          _id: show.id,
          type: show.type,
          title: show.title
        };
    } catch (err) {
      throw err;
    }
  },
  deleteShow: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const show = await Show.findByIdAndRemove(args.showId);
        return {
          ...show._doc,
          _id: show.id,
          type: show.type,
          title: show.title
        };
    } catch (err) {
      throw err;
    }
  },
  createShow: async (args, req) => {

    try {

      const creator = await Model.findById({_id: args.modelId});
      const show = new Show({
        type: args.showInput.type,
        title: args.showInput.title,
        description: args.showInput.description,
        scheduledDate: args.showInput.scheduledDate,
        scheduledTime: args.showInput.scheduledTime,
        status: args.showInput.status,
        creator: creator,
        models:  [creator],
        airedDate: "",
        airedTime: "",
        endDate: "",
        endTime: "",
        length: 0,
        content:[],
        models:[],
        viewers:[],
        chat:[],
        tags:[""],
      });

      const result = await show.save();

      return {
        ...result._doc,
        _id: result.id,
        type: result.type,
        title: result.title,
        description: result.description,
        scheduledDate: result.scheduledDate,
        scheduledTime: result.scheduledTime,
        creator: result.creator,
        models: result.models
      };
    } catch (err) {
      throw err;
    }
  }
};
