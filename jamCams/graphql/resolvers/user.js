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

const { transformUser } = require('./merge');
const { dateToString } = require('../../helpers/date');
const { pocketVariables } = require('../../helpers/pocketVars');


module.exports = {
  users: async (args, req) => {
    // console.log(`
    //   users...args: ${util.inspect(args)},
    //   isAuth: ${req.isAuth},
    //   `);

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const users = await User.find({});
      return users.map(user => {
        return transformUser(user,);
      });
    } catch (err) {
      throw err;
    }
  },
  updateUser: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = await User.findOneAndUpdate({_id:args.userId},{
        password: hashedPassword,
        name: args.userInput.name,
        username: args.userInput.username,
        dob: args.userInput.dob,
        contact: {
          email: args.userInput.contactEmail,
          phone: args.userInput.contactPhone
        },
        address: {
          number: args.userInput.addressNumber,
          street: args.userInput.addressStreet,
          town: args.userInput.addressTown,
          parish: args.userInput.addressParish,
          postOffice: args.userInput.addressPostOffice
        },
        bio: args.userInput.bio
        },{new: true});

        return {
          ...user._doc,
          _id: user.id,
          name: user.name,
          username: user.username,
          dob: user.dob,
          contact: {
            email: user.contact.email,
            phone: user.contact.phone
          },
          address: {
            number: user.address.number,
            street: user.address.street,
            town: user.address.town,
            parish: user.address.parish,
            postOffice: user.address.postOffice
          },
          bio: user.bio,
        };
    } catch (err) {
      throw err;
    }
  },
  updateUserField: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const resolverField = args.field;
      const resolverQuery = args.query;
      const query = {[resolverField]:resolverQuery};
      const user = await User.findOneAndUpdate({_id:args.userId},query,{new: true})

      return {
        ...user._doc,
        _id: user.id,
        name: user.name,
        username: user.username,
        dob: user.dob,
        contact: {
          email: user.contact.email,
          phone: user.contact.phone
        },
        address: {
          number: user.address.number,
          street: user.address.street,
          town: user.address.town,
          parish: user.address.parish,
          postOffice: user.address.postOffice
        },
        bio: user.bio,
      };
    } catch (err) {
      throw err;
    }
  },
  addUserInterest: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const interest = args.userInput.interest;
      const user = await User.findOneAndUpdate({_id:args.userId},{$addToSet: { interests: interest }},{new: true, useFindAndModify: false})
        return {
          ...user._doc,
          _id: user.id,
          email: user.email,
          name: user.name,
        };
    } catch (err) {
      throw err;
    }
  },
  deleteUserInterest: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const interest = args.userInput.interest;
        const user = await User.findOneAndUpdate({_id:args.userId},{$pull: { interests: interest }},{new: true});
        // const user = await User.findOneAndUpdate({_id:args.userId},{$pull: { interest: { date: new Date(attendanceDate) }}},{new: true})

        return {
          ...user._doc,
          _id: user.id,
          email: user.email,
          name: user.name,
        };
    } catch (err) {
      throw err;
    }
  },
  deleteUser: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const user = await User.findByIdAndRemove(args.userId);
        return {
          ...user._doc,
          _id: user.id,
          name: user.name,
          username: user.username,
          dob: user.dob,
          contact: {
            email: user.contact.email,
            phone: user.contact.phone
          },
          address: {
            number: user.address.number,
            street: user.address.street,
            town: user.address.town,
            parish: user.address.parish,
            postOffice: user.address.postOffice
          },
          bio: user.bio,
        };
    } catch (err) {
      throw err;
    }
  },
  createUser: async (args, req) => {

    try {
      const existingUserName = await User.findOne({ name: args.userInput.name, username: args.userInput.username});
      if (existingUserName) {
        throw new Error('User w/ that name & username exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        password: hashedPassword,
        name: args.userInput.name,
        username: args.userInput.username,
        dob: args.userInput.dob,
        contact: {
          email: args.userInput.contactEmail,
          phone: args.userInput.contactPhone
        },
        address: {
          number: args.userInput.addressNumber,
          street: args.userInput.addressStreet,
          town: args.userInput.addressTown,
          parish: args.userInput.addressParish,
          postOffice: args.userInput.addressPostOffice
        },
        bio: args.userInput.bio,
        profileImages: [{
          name: "",
          type: "",
          path: "",
        }],
        interests: [""],
        perks: [{
          date: "",
          name: "",
          description: "",
        }],
        models: [],
        tokens: 0,
        tags: [""],
        viewedShows: [],
        viewedContent: [],
        likedContent: [],
        searches: [{
          date: "",
          query: "",
        }],
        comments: [],
        messages: [],
        transactions: [],
        billing: [{
          date: "",
          type: "",
          description: "",
          amount: 0,
          paid: false,
          payment: "",
        }],
        complaints: [],
      });

      const result = await user.save();

      return {
        ...result._doc,
        password: hashedPassword,
        _id: result.id,
        name: result.name,
        username: result.username,
        dob: result.dob,
        content: {
          email: result.contact.email,
          phone: result.contact.phone
        },
        address: {
          number: result.address.number,
          street: result.address.street,
          town: result.address.town,
          parish: result.address.parish,
          postOffice: result.address.postOffice
        },
        bio: result.bio
      };
    } catch (err) {
      throw err;
    }
  }
};
