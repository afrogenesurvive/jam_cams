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

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const models = await Model.find({})
      .populate('fans')
      .populate('friends')
      .populate('shows')
      .populate('content')
      .populate('comments')
      .populate('messages')
      .populate('transactions');
      return models.map(model => {
        return transformModel(model,);
      });
    } catch (err) {
      throw err;
    }
  },
  getModelId: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const model = await Model.findById(args.modelId);

        return {
            ...model._doc,
            _id: model.id,
            name: model.name
        };
    } catch (err) {
      throw err;
    }
  },
  getModelField: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const resolverField = args.field;
      const resolverQuery = args.query;
      const query = {[resolverField]:resolverQuery};
      const models = await Model.find(query)

      return models.map(model => {
        return transformModel(model);

      });
    } catch (err) {
      throw err;
    }
  },
  getModelNameRegex: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const regex = "/^" + args.regex + "/";
      const models = await Model.find({'name': {$regex: regex, $options: 'i'}});

      return models.map(model => {
        return transformModel(model);
      });
    } catch (err) {
      throw err;
    }
  },
  getModelInterests: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const interests = args.interests;
      const models = await Model.find({'interests': {$all: interests}});

      return models.map(model => {
        return transformModel(model);
      });
    } catch (err) {
      throw err;
    }
  },
  getModelSocialMedia: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const dbQueryKey = `socialMedia.${args.socialMediaKey}`;
      const models = await Model.find({dbQueryKey: args.socialMediaValue});

      return models.map(model => {
        return transformModel(model);
      });
    } catch (err) {
      throw err;
    }
  },
  getModelTraits: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const models = await Model.find({traits: {$all: args.traits}});

      return models.map(model => {
        return transformModel(model);
      });
    } catch (err) {
      throw err;
    }
  },
  getModelPerks: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const perkNames = args.perkNames;
      const models = await Model.find({'perks.name': {$all: perkNames}});

      return models.map(model => {
        return transformModel(model);
      });
    } catch (err) {
      throw err;
    }
  },
  getModelTokenAmount: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const tokenAmount = args.tokenAmount;
      const models = await Model.find({'tokens': tokenAmount});

      return models.map(model => {
        return transformModel(model);
      });
    } catch (err) {
      throw err;
    }
  },
  getModelTags: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const tags = args.tags;
      const models = await Model.find({'tags': {$all: tags}});

      return models.map(model => {
        return transformModel(model);
      });
    } catch (err) {
      throw err;
    }
  },
  getModelCategories: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const categories = args.categories;
      const models = await Model.find({'categories': {$all: categories}});

      return models.map(model => {
        return transformModel(model);
      });
    } catch (err) {
      throw err;
    }
  },
  getModelFan: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const fan = await User.findById({_id: args.fanId})
      const models = await Model.find({fans: fan});

      return models.map(model => {
        return transformUser(model);
      });
    } catch (err) {
      throw err;
    }
  },
  getModelFriend: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const friend = await User.findById({_id: args.friendId})
      const models = await Model.find({friends: friend});

      return models.map(model => {
        return transformUser(model);
      });
    } catch (err) {
      throw err;
    }
  },
  getModelShow: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const show = await User.findById({_id: args.showId})
      const models = await Model.find({shows: show});

      return models.map(model => {
        return transformUser(model);
      });
    } catch (err) {
      throw err;
    }
  },
  getModelContent: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const content = await User.findById({_id: args.contentId})
      const models = await Model.find({content: content});

      return models.map(model => {
        return transformUser(model);
      });
    } catch (err) {
      throw err;
    }
  },
  getModelComment: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const comment = await User.findById({_id: args.commentId})
      const models = await Model.find({comments: comment});

      return models.map(model => {
        return transformUser(model);
      });
    } catch (err) {
      throw err;
    }
  },
  getModelMessage: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const message = await User.findById({_id: args.messageId})
      const models = await Model.find({messages: message});

      return models.map(model => {
        return transformUser(model);
      });
    } catch (err) {
      throw err;
    }
  },
  getModelTransaction: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const transaction = await User.findById({_id: args.transactionId})
      const models = await Model.find({transactions: transaction});

      return models.map(model => {
        return transformUser(model);
      });
    } catch (err) {
      throw err;
    }
  },
  getThisModel: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const model = await Model.findById({_id: args.activityId});

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
          email: args.modelInput.contactEmail,
          phone: args.modelInput.contactPhone
        },
        address: {
          number: args.modelInput.addressNumber,
          street: args.modelInput.addressStreet,
          town: args.modelInput.addressTown,
          city: args.modelInput.addressCity,
          country: args.modelInput.addressCountry,
          postalCode: args.modelInput.addressPostalCode,
        },
        bio: args.modelInput.bio
        },{new: true, useFindAndModify: false});

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
      const model = await Model.findOneAndUpdate({_id:args.modelId},query,{new: true, useFindAndModify: false})

      return {
        ...model._doc,
        _id: model.id,
        name: model.name,
      };
    } catch (err) {
      throw err;
    }
  },
  addModelInterests: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const interests = args.interests;
      const model = await Model.findOneAndUpdate({_id:args.modelId},{$addToSet: { interests: {$each: interests} }},{new: true, useFindAndModify: false})
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
  addModelSocialMedia: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const socialMedia = args.socialMedia;
      const model = await Model.findOneAndUpdate({_id:args.modelId},{$addToSet: { socialMedia: {$each: socialMedia} }},{new: true, useFindAndModify: false})
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
  addModelTraits: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const traits = args.traits;
      const model = await Model.findOneAndUpdate({_id:args.modelId},{$addToSet: { traits: {$each: traits} }},{new: true, useFindAndModify: false})
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
  addModelProfileImage: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const profileImage = {
        name: args.modelInput.profileImageName,
        type: args.modelInput.profileImagesType,
        path: args.modelInput.profileImagesPath
      };
      const model = await Model.findOneAndUpdate({_id:args.modelId},{$addToSet: { profileImages: profileImage }},{new: true, useFindAndModify: false})
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
  addModelPerk: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const perk = {
        date: args.modelInput.date,
        name: args.modelInput.name,
        description: args.modelInput.description,
      };
      const model = await Model.findOneAndUpdate({_id:args.modelId},{$addToSet: { perks: perk }},{new: true, useFindAndModify: false})
        return {
          ...model._doc,
          _id: model.id,
          email: model.contact.email,
          name: model.name,
        };
    } catch (err) {
      throw err;
    }
  },
  addModelPerks: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const perks = args.perks;
      const model = await Model.findOneAndUpdate({_id:args.modelId},{$addToSet: { perks: {$each: perks} }},{new: true, useFindAndModify: false})
        return {
          ...model._doc,
          _id: model.id,
          email: model.contact.email,
          name: model.name,
        };
    } catch (err) {
      throw err;
    }
  },
  addModelTokens: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    // admin or own profile check here
    try {
      const prevAmountModel = await Model.findById({_id: args.modelId});
      const prevAmount = prevAmountModel.tokens;
      const amountToAdd = args.modelInput.tokens;
      let newAmount = prevAmount + amountToAdd;
      const model = await Model.findOneAndUpdate({_id:args.modelId},{ tokens: newAmount },{new: true, useFindAndModify: false})
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
  addModelTags: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const tags = args.tags;
      const model = await Model.findOneAndUpdate({_id:args.modelId},{$addToSet: { tags: {$each: tags} }},{new: true, useFindAndModify: false})
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
  addModelCategories: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      const categories = args.categories;
      const model = await Model.findOneAndUpdate({_id:args.modelId},{$addToSet: { categories: {$each: categories} }},{new: true, useFindAndModify: false})
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
  addModelFan: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const fan = await User.findById({_id: args.fanId})
      const model = await Model.findOneAndUpdate({_id: args.modelId},{$addToSet: {fans: fan}},{new: true, useFindAndModify: false});

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
  addModelFriend: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const friend = await Model.findById({_id: args.friendId})
      const model = await Model.findOneAndUpdate({_id: args.modelId},{$addToSet: {friends: friend}},{new: true, useFindAndModify: false});

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
  addModelShow: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const show = await Model.findById({_id: args.showId})
      const model = await Model.findOneAndUpdate({_id: args.modelId},{$addToSet: {shows: show}},{new: true, useFindAndModify: false});

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
  addModelComment: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const comment = await Model.findById({_id: args.commentId})
      const model = await Model.findOneAndUpdate({_id: args.modelId},{$addToSet: {comments: comment}},{new: true, useFindAndModify: false});

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
  addModelContent: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const content = await Model.findById({_id: args.contentId})
      const model = await Model.findOneAndUpdate({_id: args.modelId},{$addToSet: {content: content}},{new: true, useFindAndModify: false});

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
  addModelMessage: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const message = await Model.findById({_id: args.messageId})
      const model = await Model.findOneAndUpdate({_id: args.modelId},{$addToSet: {messages: message}},{new: true, useFindAndModify: false});

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
  addModelTransaction: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {

      const transaction = await Model.findById({_id: args.transactionId})
      const model = await Model.findOneAndUpdate({_id: args.modelId},{$addToSet: {transactions: transaction}},{new: true, useFindAndModify: false});

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
  deleteModelInterest: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const interest = args.modelInput.interest;
        const model = await Model.findOneAndUpdate({_id:args.modelId},{$pull: { interests: interest }},{new: true, useFindAndModify: false});
        // const user = await Model.findOneAndUpdate({_id:args.userId},{$pull: { interest: { date: new Date(attendanceDate) }}},{new: true, useFindAndModify: false})

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
  deleteModelTraits: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const traits = args.traits;
        const model = await Model.findOneAndUpdate({_id:args.modelId},{$pull: { traits: traits }},{new: true, useFindAndModify: false});

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
  deleteModelInterests: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const interests = args.interests;
        const model = await Model.findOneAndUpdate({_id:args.modelId},{$pull: { interests: interests }},{new: true, useFindAndModify: false});

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
  deleteModelSocialMedia: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const socialMedia = args.socialMedia;
        const model = await Model.findOneAndUpdate({_id:args.modelId},{$pull: { socialMedia: socialMedia }},{new: true, useFindAndModify: false});

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
  deleteModelProfileImage: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const profileImageName = args.profileImageName;
        const model = await Model.findOneAndUpdate({_id:args.modelId},{$pull: { 'profileImages.name': profileImageName }},{new: true, useFindAndModify: false});

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
  deleteModelPerks: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const perkNames = args.perkNames;
        const model = await Model.findOneAndUpdate({_id:args.modelId},{$pull: { 'perks.name': perkNames }},{new: true, useFindAndModify: false});

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
  deleteModelTags: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const tags = args.tags;
        const model = await Model.findOneAndUpdate({_id:args.modelId},{$pull: { 'tags': tags }},{new: true, useFindAndModify: false});

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
  deleteModelCategories: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const categories = args.categories;
        const model = await Model.findOneAndUpdate({_id:args.modelId},{$pull: { 'categories': categories }},{new: true, useFindAndModify: false});

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
  deleteModelFan: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const fan = await User.findById({_id: args.fanId});
        const model = await Model.findOneAndUpdate({_id:args.modelId},{$pull: { 'fans': fan }},{new: true, useFindAndModify: false});

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
  deleteModelFriend: async (args, req) => {

    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
        const friend = await Model.findById({_id: args.friendId});
        const model = await Model.findOneAndUpdate({_id:args.modelId},{$pull: { 'fans': fan }},{new: true, useFindAndModify: false});

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
      const existingModelName = await Model.findOne({ username: args.modelInput.username});
      if (existingModelName) {
        throw new Error('Model w/ that username exists already.');
      }
      const hashedPassword = await bcrypt.hash(args.modelInput.password, 12);
      const model = new Model({
        password: hashedPassword,
        name: args.modelInput.name,
        role: "Model",
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
          city: args.modelInput.addressCity,
          country: args.modelInput.addressCountry,
          postalCode: args.modelInput.addressPostalCode
        },
        bio: args.modelInput.bio,
        modelNames: [args.modelInput.modelName],
        socialMedia: [{
          platform: "",
          handle: "",
        }],
        traits: [{
          key: "",
          value: "",
        }],
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
        tokens: 0,
        fans: [],
        friends: [],
        tags: [""],
        categories: [""],
        shows: [],
        content: [],
        comments: [],
        messages: [],
        transactions: [],
      });

      const result = await model.save();

      return {
        ...result._doc,
        password: hashedPassword,
        _id: result.id,
        name: result.name,
        role: result.role,
        username: result.username,
        dob: result.dob,
        contact: {
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
        bio: result.bio,
        modelNames: result.modelNames
      };
    } catch (err) {
      throw err;
    }
  }
};
