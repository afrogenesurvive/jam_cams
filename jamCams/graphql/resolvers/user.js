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
      const users = await User.find({})
      .populate('models')
      .populate('viewedShows.ref')
      .populate('viewedcontent.ref')
      .populate('likedcontent.ref')
      .populate('comments')
      // .populate('messages.sender.ref')
      // .populate('messages.recdeiver.ref')
      .populate('messages')
      .populate('transactions');
      return users.map(user => {
        return transformUser(user,);
      });
    } catch (err) {
      throw err;
    }
  },
  getUserId: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const user = await User.findById(args.userId);

        return {
            ...user._doc,
            _id: user.id,
            name: user.name
        };
    } catch (err) {
      throw err;
    }
  },
  getUserField: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const resolverField = args.field;
      const resolverQuery = args.query;
      const query = {[resolverField]:resolverQuery};
      const users = await User.find(query)

      return users.map(user => {
        return transformUser(user);

      });
    } catch (err) {
      throw err;
    }
  },
  getUserNameRegex: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const regex = "/^" + args.regex + "/";
      const users = await User.find({'name': {$regex: regex, $options: 'i'}});

      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  getUserInterests: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const interests = args.interests;
      const users = await User.find({'interests': {$all: interests}});

      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  getUserPerks: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const perkNames = args.perkNames;
      const users = await User.find({'perks.name': {$all: perkNames}});

      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  getUserTokenAmount: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const tokenAmount = args.tokenAmount;
      const users = await User.find({'tokens': tokenAmount});

      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  getUserSearchQueries: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const searchQueries = args.searchQueries;
      const users = await User.find({'searches.query': {$all: searchQueries}});

      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  getUserTags: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const tags = args.tags;
      const users = await User.find({'tags': {$all: tags}});

      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  getUserBilling: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const dbQueryKey = `billing.${args.billingKey}`;
      // const dbQueryKey = "billing."+args.billingKey+"";
      // console.log(JSON.stringify(dbQueryKey));
      const users = await User.find({dbQueryKey: args.billingValue});

      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  getUserComplaint: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const dbQueryKey = `complaint.${args.complaintKey}`;
      // const dbQueryKey = "complaint."+args.complaintKey+"";
      // console.log(JSON.stringify(dbQueryKey));
      const users = await User.find({dbQueryKey: args.complaintValue});

      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  getUserModel: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const model = await Model.findById({_id: args.modelId})
      const users = await User.find({model: model});

      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  getUserViewedShow: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const show = await Show.findById({_id: args.showId})
      const users = await User.find({'viewedShows.ref': show});

      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  getUserViewedContent: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const content = await Content.findById({_id: args.contentId})
      const users = await User.find({'viewedContent.ref': content});

      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  getUserLikedContent: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const content = await Content.findById({_id: args.contentId})
      const users = await User.find({'likedContent.ref': content});

      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  getUserComment: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const comment = await Comment.findById({_id: args.commentId})
      const users = await User.find({comments: comment});

      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  getUserMessage: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const message = await Message.findById({_id: args.messageId})
      const users = await User.find({messages: message});

      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  getUserTransaction: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const transaction = await Transaction.findById({_id: args.transactionId})
      const users = await User.find({transactions: transaction});

      return users.map(user => {
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  getThisUser: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const user = await User.findById({_id: args.activityId});

      return {
        ...user._doc,
        _id: user.id,
        email: user.contact.email ,
        name: user.name,
      };
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
          city: args.userInput.addressCity,
          country: args.userInput.addressCountry,
          postalCode: args.userInput.addressPostalCode,
        },
        bio: args.userInput.bio
        },{new: true, useFindAndModify: false});

        return {
          ...user._doc,
          _id: user.id,
          name: user.name,
          role: user.role,
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
            city: user.address.city,
            country: user.address.country,
            postalCode: user.address.postalCode
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
      const user = await User.findOneAndUpdate({_id:args.userId},query,{new: true, useFindAndModify: false})

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
          city: user.address.city,
          country: user.address.country,
          postalCode: user.address.postalCode
        },
        bio: user.bio,
      };
    } catch (err) {
      throw err;
    }
  },
  addUserInterests: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const interests = args.interests;
      const user = await User.findOneAndUpdate({_id:args.userId},{$addToSet: { interests: {$each: interests} }},{new: true, useFindAndModify: false})
        return {
          ...user._doc,
          _id: user.id,
          email: user.contact.email ,
          name: user.name,
        };
    } catch (err) {
      throw err;
    }
  },
  addUserTags: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const tags = args.tags;
      const user = await User.findOneAndUpdate({_id:args.userId},{$addToSet: { tags: {$each: tags} }},{new: true, useFindAndModify: false})
        return {
          ...user._doc,
          _id: user.id,
          email: user.contact.email ,
          name: user.name,
        };
    } catch (err) {
      throw err;
    }
  },
  addUserPerk: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const perk = {
        date: args.userInput.date,
        name: args.userInput.name,
        description: args.userInput.description,
      };
      const user = await User.findOneAndUpdate({_id:args.userId},{$addToSet: { perks: perk }},{new: true, useFindAndModify: false})
        return {
          ...user._doc,
          _id: user.id,
          email: user.contact.email,
          name: user.name,
        };
    } catch (err) {
      throw err;
    }
  },
  addUserPerks: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const perks = args.perks;
      const user = await User.findOneAndUpdate({_id:args.userId},{$addToSet: { perks: {$each: perks} }},{new: true, useFindAndModify: false})
        return {
          ...user._doc,
          _id: user.id,
          email: user.contact.email,
          name: user.name,
        };
    } catch (err) {
      throw err;
    }
  },
  addUserProfileImage: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const profileImage = {
        name: args.userInput.profileImageName,
        type: args.userInput.profileImagesType,
        path: args.userInput.profileImagesPath
      };
      const user = await User.findOneAndUpdate({_id:args.userId},{$addToSet: { perks: {$each: perks} }},{new: true, useFindAndModify: false})
        return {
          ...user._doc,
          _id: user.id,
          email: user.contact.email,
          name: user.name,
        };
    } catch (err) {
      throw err;
    }
  },
  addUserToken: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    // admin or own profile check here
    try {
      const prevAmountUser = await User.findById({_id: args.userId});
      const prevAmount = prevAmountUser.tokens;
      const amountToAdd = args.userInput.tokens;
      const newAmount = prevAmount + amountToAdd;
      const user = await User.findOneAndUpdate({_id:args.userId},{ tokens: newAmount },{new: true, useFindAndModify: false})
        return {
          ...user._doc,
          _id: user.id,
          email: user.contact.email ,
          name: user.name,
        };
    } catch (err) {
      throw err;
    }
  },
  addUserSearch: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const search = {
        date: args.userInput.searchDate,
        query: args.userInput.searchQuery,
      };
      const user = await User.findOneAndUpdate({_id:args.userId},{$addToSet: { searches: search }},{new: true, useFindAndModify: false})
        return {
          ...user._doc,
          _id: user.id,
          email: user.contact.email ,
          name: user.name,
        };
    } catch (err) {
      throw err;
    }
  },
  addUserBilling: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const billing = {
        date: args.userInput.billingDate,
        type: args.userInput.billingType,
        description: args.userInput.billingDescription,
        amount: args.userInput.billingAmount,
        paid: args.userInput.billingPaid,
        payment: args.userInput.billingPayment
      };
      const user = await User.findOneAndUpdate({_id:args.userId},{$addToSet: { billing: billing }},{new: true, useFindAndModify: false})
        return {
          ...user._doc,
          _id: user.id,
          email: user.contact.email ,
          name: user.name,
        };
    } catch (err) {
      throw err;
    }
  },
  editUserBillingPaid: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const user = await User.findOneAndUpdate({'billing.date': args.date, 'billing.amount': args.amount},{$set: {paid: true}},{new: true, useFindAndModify: false})
      // const user = await User.findOneAndUpdate({'billing.date': args.date, 'billing.amount': args.amount},{$set: { dbQueryNewKey: args.newValue }},{new: true, useFindAndModify: false})
        return {
          ...user._doc,
          _id: user.id,
          email: user.contact.email ,
          name: user.name,
        };
    } catch (err) {
      throw err;
    }
  },
  addUserComplaint: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const complainant = await Model.findById({_id: args.complainantId})
      const complaint = {
        date: args.userInput.complaintDate,
        type: args.userInput.complaintType,
        description: args.userInput.complaintDescription,
        complainant: complainant,
      };
      const user = await User.findOneAndUpdate({_id:args.userId},{$addToSet: { complaints: complaint }},{new: true, useFindAndModify: false})
        return {
          ...user._doc,
          _id: user.id,
          email: user.contact.email ,
          name: user.name,
        };
    } catch (err) {
      throw err;
    }
  },
  addUserModel: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const model = await Model.findById({_id: args.modelId})
      const user = await User.findOneAndUpdate({_id: args.userId},{$addToSet: {models: model}},{new: true, useFindAndModify: false})
      .populate('models');

      return {
        ...user._doc,
        _id: user.id,
        email: user.contact.email ,
        name: user.name,
      };
    } catch (err) {
      throw err;
    }
  },
  addUserViewedShow: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const show = await Show.findById({_id: args.showId});
      const user = await User.findOneAndUpdate({_id: args.userId},{$addToSet: {viewedShows: show}},{new: true, useFindAndModify: false});

      return {
        ...user._doc,
        _id: user.id,
        email: user.contact.email ,
        name: user.name,
      };
    } catch (err) {
      throw err;
    }
  },
  addUserViewedContent: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const content = await Content.findById({_id: args.contentId});
      const user = await User.findOneAndUpdate({_id: args.userId},{$addToSet: {viewedContent: content}},{new: true, useFindAndModify: false})
      .populate('viewedContent.ref');

      return {
        ...user._doc,
        _id: user.id,
        email: user.contact.email ,
        name: user.name,
      };
    } catch (err) {
      throw err;
    }
  },
  addUserLikedContent: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const content = await Content.findById({_id: args.contentId})
      const user = await User.findOneAndUpdate({_id: args.userId},{$addToSet: {likedContent: content}},{new: true, useFindAndModify: false});

      return {
        ...user._doc,
        _id: user.id,
        email: user.contact.email ,
        name: user.name,
      };
    } catch (err) {
      throw err;
    }
  },
  addUserComment: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const comment = await Comment.findById({_id: args.commentId})
      const user = await User.findOneAndUpdate({_id: args.userId},{$addToSet: {comments: comment}},{new: true, useFindAndModify: false})
      .populate('comments');

      return {
        ...user._doc,
        _id: user.id,
        email: user.contact.email ,
        name: user.name,
      };
    } catch (err) {
      throw err;
    }
  },
  addUserMessage: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const message = await Message.findById({_id: args.messageId})
      const user = await User.findOneAndUpdate({_id: args.userId},{$addToSet: {messages: message}},{new: true, useFindAndModify: false})
      .populate('messages');

      return {
        ...user._doc,
        _id: user.id,
        email: user.contact.email ,
        name: user.name,
      };
    } catch (err) {
      throw err;
    }
  },
  addUserTransaction: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const transaction = await Transaction.findById({_id: args.transactionId})
      const user = await User.findOneAndUpdate({_id: args.userId},{$addToSet: {transactions: transaction}},{new: true, useFindAndModify: false});

      return {
        ...user._doc,
        _id: user.id,
        email: user.contact.email ,
        name: user.name,
      };
    } catch (err) {
      throw err;
    }
  },
  deleteUserInterests: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const interests = args.userInput.interest;
        const user = await User.findOneAndUpdate({_id:args.userId},{$pull: { interests: interests }},{new: true, useFindAndModify: false});
        // const user = await User.findOneAndUpdate({_id:args.userId},{$pull: { interest: { date: new Date(attendanceDate) }}},{new: true, useFindAndModify: false})

        return {
          ...user._doc,
          _id: user.id,
          email: user.contact.email ,
          name: user.name,
        };
    } catch (err) {
      throw err;
    }
  },
  deleteUserPerks: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const perks = args.perkNames;
        const user = await User.findOneAndUpdate({_id:args.userId},{$pull: { 'perks.name': perkNames }},{new: true, useFindAndModify: false});
        // const user = await User.findOneAndUpdate({_id:args.userId},{$pull: { interest: { date: new Date(attendanceDate) }}},{new: true, useFindAndModify: false})

        return {
          ...user._doc,
          _id: user.id,
          email: user.contact.email ,
          name: user.name,
        };
    } catch (err) {
      throw err;
    }
  },
  deleteUserTags: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const tags = args.tags;
        const user = await User.findOneAndUpdate({_id:args.userId},{$pull: { 'tags': tags }},{new: true, useFindAndModify: false});
        // const user = await User.findOneAndUpdate({_id:args.userId},{$pull: { interest: { date: new Date(attendanceDate) }}},{new: true, useFindAndModify: false})

        return {
          ...user._doc,
          _id: user.id,
          email: user.contact.email ,
          name: user.name,
        };
    } catch (err) {
      throw err;
    }
  },
  deleteUserSearches: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const searchQueries = args.searchQueries;
        const user = await User.findOneAndUpdate({_id:args.userId},{$pull: { 'searches.query': searchQueries }},{new: true, useFindAndModify: false});

        return {
          ...user._doc,
          _id: user.id,
          email: user.contact.email ,
          name: user.name,
        };
    } catch (err) {
      throw err;
    }
  },
  deleteUserBilling: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const billing = {
          date: args.userInput.billingDate,
          type: args.userInput.billingType,
          description: args.userInput.billingDescription,
          amount: args.userInput.billingAmount,
          paid: args.userInput.billingPaid,
          payment: args.userInput.billingPayment
        };
        const user = await User.findOneAndUpdate({_id:args.userId},{$pull: { billing: billing }},{new: true, useFindAndModify: false});

        return {
          ...user._doc,
          _id: user.id,
          email: user.contact.email ,
          name: user.name,
        };
    } catch (err) {
      throw err;
    }
  },
  deleteUserComplaint: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const complaint = {
          date: args.userInput.complaintDate,
          type: args.userInput.complaintType,
          description: args.userInput.complaintDescription,
          complainant: args.userInput.complaintComplainant
        };
        const user = await User.findOneAndUpdate({_id:args.userId},{$pull: { complaints: complaint }},{new: true, useFindAndModify: false});

        return {
          ...user._doc,
          _id: user.id,
          email: user.contact.email ,
          name: user.name,
        };
    } catch (err) {
      throw err;
    }
  },
  deleteUserModel: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const model = await Model.findById({_id: args.modelId});
        const user = await User.findOneAndUpdate({_id:args.userId},{$pull: { 'models': model }},{new: true, useFindAndModify: false});

        return {
          ...model._doc,
          _id: model.id,
          email: model.contact.email ,
          name: model.name,
        };
    } catch (err) {
      throw err;
    }
  },
  deleteUserLikedContent: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const content = await Content.findById({_id: args.contentId});
        const user = await User.findOneAndUpdate({_id:args.userId},{$pull: { 'likedContent.ref': content }},{new: true, useFindAndModify: false});

        return {
          ...model._doc,
          _id: model.id,
          email: model.contact.email ,
          name: model.name,
        };
    } catch (err) {
      throw err;
    }
  },
  deleteUserComment: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const comment = await Comment.findById({_id: args.commentId});
        const user = await User.findOneAndUpdate({_id:args.userId},{$pull: { 'comments': comment }},{new: true, useFindAndModify: false});

        return {
          ...model._doc,
          _id: model.id,
          email: model.contact.email ,
          name: model.name,
        };
    } catch (err) {
      throw err;
    }
  },
  deleteUserMessage: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const message = await Message.findById({_id: args.messageId});
        const user = await User.findOneAndUpdate({_id:args.userId},{$pull: { 'messages': message }},{new: true, useFindAndModify: false});

        return {
          ...model._doc,
          _id: model.id,
          email: model.contact.email ,
          name: model.name,
        };
    } catch (err) {
      throw err;
    }
  },
  deleteUserTransaction: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const transaction = await Transaction.findById({_id: args.transactionId});
        const user = await User.findOneAndUpdate({_id:args.userId},{$pull: { 'transactions': transaction }},{new: true, useFindAndModify: false});

        return {
          ...model._doc,
          _id: model.id,
          email: model.contact.email ,
          name: model.name,
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
            city: user.address.city,
            country: user.address.country,
            postalCode: user.address.postalCode
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
        role: "User",
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
          city: args.userInput.addressCity,
          country: args.userInput.addressCountry,
          postalCode: args.userInput.addressPostalCode
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
        role: result.role,
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
          city: result.address.city,
          country: result.address.country,
          postalCode: result.address.postalCode
        },
        bio: result.bio
      };
    } catch (err) {
      throw err;
    }
  }
};
