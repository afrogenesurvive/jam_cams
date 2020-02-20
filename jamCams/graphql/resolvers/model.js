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

const { transformModel } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');


module.exports = {
  models: async (args, req) => {
    // console.log(`
    //   users...args: ${util.inspect(args)},
    //   isAuth: ${req.isAuth},
    //   `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const models = await Model.find({});
      return models.map(model => {
        return transformModel(model,);
      });
    } catch (err) {
      throw err;
    }
  },
  updateModel: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const hashedPassword = await bcrypt.hash(args.modelInput.password, 12);
      const model = await Model.findOneAndUpdate({_id:args.modelId},{
        password: hashedPassword,
        name: args.modelInput.name,
        username: args.modelInput.username,
        dob: args.modelInput.dob,
        contact: {
          email: args.modelInput.email,
          phone: args.modelInput.phone
        },
        address: {
          number: args.modelInput.addressNumber,
          street: args.modelInput.addressStreet,
          town: args.modelInput.addressTown,
          parish: args.modelInput.addressParish,
          postOffice: args.modelInput.addressPostOffice
        },
        bio: args.modelInput.bio
        },{new: true});

        return {
          ...model._doc,
          _id: model.id,
          name: model.name,
        };
    } catch (err) {
      throw err;
    }
  },
  updateModelField: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const resolverField = args.field;
      const resolverQuery = args.query;
      const query = {[resolverField]:resolverQuery};
      const model = await Model.findOneAndUpdate({_id:args.modelId},query,{new: true})

      return {
        ...model._doc,
        _id: model.id,
        name: model.name,
      };
    } catch (err) {
      throw err;
    }
  },
  addModelInterest: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const interest = args.modelInput.interest;
      const model = await Model.findOneAndUpdate({_id:args.modelId},{$addToSet: { interests: interest }},{new: true, useFindAndModify: false})
        return {
          ...model._doc,
          _id: model.id,
          email: model.email,
          name: model.name,
        };
    } catch (err) {
      throw err;
    }
  },
  deleteModelInterest: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const interest = args.modelInput.interest;
        const model = await Model.findOneAndUpdate({_id:args.modelId},{$pull: { interests: interest }},{new: true});
        // const user = await Model.findOneAndUpdate({_id:args.userId},{$pull: { interest: { date: new Date(attendanceDate) }}},{new: true})

        return {
          ...model._doc,
          _id: model.id,
          email: model.email,
          name: model.name,
        };
    } catch (err) {
      throw err;
    }
  },
  deleteModel: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const model = await Model.findByIdAndRemove(args.modelId);
        return {
          ...model._doc,
          _id: model.id,
          name: model.name,
        };
    } catch (err) {
      throw err;
    }
  },
  createModel: async (args, req) => {

    try {
      const existingModelName = await Model.findOne({ name: args.modelInput.name, username: args.modelInput.username});
      if (existingModelName) {
        throw new Error('Model w/ that name & username exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.modelInput.password, 12);
      const model = new Model({
        password: hashedPassword,
        name: args.modelInput.name,
        username: args.modelInput.username,
        dob: args.modelInput.dob,
        contact: {
          email: args.modelInput.contactEmail,
          phone: args.modelInput.contactPhone
        },
        address: {
          number: args.modelInput.addressNumber,
          street: args.modelInput.addressStreet,
          town: args.modelInput.addressTown,
          parish: args.modelInput.addressParish,
          postOffice: args.modelInput.addressPostOffice
        },
        bio: args.modelInput.bio
      });

      const result = await model.save();

      return {
        ...result._doc,
        password: hashedPassword,
        _id: result.id,
        name: result.name,
        username: result.username,
        dob: result.dob,
        contact: {
          email: result.contact.email,
          phone: result.contact.phone
        },
        address: {
          number: result.address.Number,
          street: result.address.Street,
          town: result.address.Town,
          parish: result.address.Parish,
          postOffice: result.address.PostOffice
        },
        bio: result.bio
      };
    } catch (err) {
      throw err;
    }
  }
};
