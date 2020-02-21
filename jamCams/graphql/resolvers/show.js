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
  addShowTag: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const tag = args.showInput.tag;
      const show = await Show.findOneAndUpdate({_id:args.showId},{$addToSet: { tags: tag }},{new: true, useFindAndModify: false})
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
  deleteShowTag: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const tag = args.showInput.tag;
        const show = await Show.findOneAndUpdate({_id:args.showId},{$pull: { tags: tag }},{new: true});
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

      const creator = await Model.findById({_id: args.creatorId});
      const show = new Show({
        type: args.showInput.type,
        title: args.showInput.title,
        description: args.showInput.description,
        scheduledDate: args.showInput.scheduledDate,
        scheduledTime: args.showInput.scheduledTime,
        creator: creator,
        models:  [creator]
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
