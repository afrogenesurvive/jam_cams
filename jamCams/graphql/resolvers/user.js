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
      const user = await User.findOneAndUpdate({_id:args.selectedUserId},{
        email: args.userInput.email,
        password: hashedPassword,
        name: args.userInput.name,
        dob: args.userInput.dob,
        address: {
          number: args.userInput.addressNumber,
          street: args.userInput.addressStreet,
          town: args.userInput.addressTown,
          parish: args.userInput.addressParish,
          postOffice: args.userInput.addressPostOffice,
        },
        phone: args.userInput.phone,
        role: args.userInput.role,
        employmentDate: args.userInput.employmentDate,
        terminationDate: args.userInput.terminationDate,
        },{new: true});

        return {
          ...user._doc,
          _id: user.id,
          email: user.email,
          name: user.name,
          dob: user.dob,
          address: user.address,
          phone: user.phone,
          role: user.role,
          employmentDate: user.employmentDate,
          terminationDate: user.terminationDate,
          attachments: user.attachments,
          attendance: user.attendance,
          leave: user.leave,
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
      const user = await User.findOneAndUpdate({_id:args.selectedUserId},query,{new: true})

      return {
        ...user._doc,
        _id: user.id,
        email: user.email,
        name: user.name,
        dob: user.dob,
        address: user.address,
        phone: user.phone,
        role: user.role,
        employmentDate: user.employmentDate,
        terminationDate: user.terminationDate,
        attachments: user.attachments,
        attendance: user.attendance,
        leave: user.leave,
      };
    } catch (err) {
      throw err;
    }
  },

  updateUserAttendanceToday: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const today = new Date();
      const status = "Present";
      const userAttendanceObject = {
        date: today,
        status: status,
      }
      const user = await User.findOneAndUpdate({_id:args.selectedUserId},{$addToSet: { attendance: userAttendanceObject}},{new: true, useFindAndModify: false})

        return {
          ...user._doc,
          _id: user.id,
          email: user.email,
          name: user.name,
          dob: user.dob,
          address: user.address,
          phone: user.phone,
          role: user.role,
          employmentDate: user.employmentDate,
          terminationDate: user.terminationDate,
          attachments: user.attachments,
          attendance: user.attendance,
          leave: user.leave,
        };
    } catch (err) {
      throw err;
    }
  },


  deleteUserAttendance: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

        const attendanceDate = args.attendanceDate;
        const user = await User.findOneAndUpdate({_id:args.selectedUserId},{$pull: { attendance: { date: new Date(attendanceDate) }}},{new: true})

        return {
          ...user._doc,
          _id: user.id,
          email: user.email,
          name: user.name,
          dob: user.dob,
          address: user.address,
          phone: user.phone,
          role: user.role,
          employmentDate: user.employmentDate,
          terminationDate: user.terminationDate,
          attachments: user.attachments,
          attendance: user.attendance,
          leave: user.leave,
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
      const user = await User.findByIdAndRemove(args.selectedUserId);
        return {
          ...user._doc,
          _id: user.id,
          email: user.email,
          name: user.name,
          dob: user.dob,
          address: user.address,
          phone: user.phone,
          role: user.role,
          employmentDate: user.employmentDate,
          terminationDate: user.terminationDate,
          attachments: user.attachments,
          attendance: user.attendance,
          leave: user.leave,
        };
    } catch (err) {
      throw err;
    }
  },
  createUser: async (args, req) => {

    try {
      const existingUserName = await User.findOne({ name: args.userInput.name});
      if (existingUserName) {
        throw new Error('User w/ that name exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
      const user = new User({
        email: args.userInput.email,
        password: hashedPassword,
        name: args.userInput.name,
        dob: args.userInput.dob,
        address: {
          number: args.userInput.addressNumber,
          street: args.userInput.addressStreet,
          town: args.userInput.addressTown,
          parish: args.userInput.addressParish,
          postOffice: args.userInput.addressPostOffice,
        },
        phone: args.userInput.phone,
        role: args.userInput.role,
        employmentDate: args.userInput.employmentDate,
        terminationDate: args.userInput.terminationDate,
        attachments: [{
              name: "",
              format: "",
              path: "",
            }],
        attendance: [{
            date: 0,
            status: "",
            description: "",
          }],
        leave: [{
            type: "",
            title: "",
            startDate: 0,
            endDate: 0,
          }],
      });

      const result = await user.save();

      return {
        ...result._doc,
        password: hashedPassword,
        _id: result.id,
        email: result.email,
        name: result.name,
        dob: result.dob,
        address: result.address,
        phone: result.phone,
        role: result.role,
        employmentDate: result.employmentDate,
        terminationDate: result.terminationDate,
        attachments: result.attachments,
        attendance: result.attendance,
        leave: result.leave,
      };
    } catch (err) {
      throw err;
    }
  }
};
