const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const Model = require('../../models/model');
const { pocketVariables } = require('../../helpers/pocketVars');

module.exports = {
  userLogin: async ({ email, password }) => {

    const user = await User.findOne({ 'contact.email': email });
    if (!user) {
      throw new Error('User does not exist!');

    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign({ userId: user.id },'JammaCammaDingDong',{expiresIn: '4h'});

    const userLoggedIn = await User.findOneAndUpdate({_id: user.id},{loggedIn: true},{new: true, useFindAndModify: false})
    // pocketVariables.token = token;
    // pocketVariables.userId = user.id;

    return { activityId: user.id, role: "User", token: token, tokenExpiration: 4 };
  },
  userLogout: async ({ args }) => {

    const userLogout = await User.findOneAndUpdate({ _id: args.userId },{loggedIn: false},{new: true, useFindAndModify: false});

    return {
      ...user._doc,
      _id: user.id,
      email: user.contact.email ,
      name: user.name,
    };
  },
  modelLogin: async ({ email, password }) => {

    const model = await Model.findOne({ 'contact.email': email });
    if (!model) {
      throw new Error('Model does not exist!');

    }
    const isEqual = await bcrypt.compare(password, model.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign({ modelId: model.id },'JammaCammaDingDong',{expiresIn: '4h'});

    const modelLoggedIn = await Model.findOneAndUpdate({_id: model._id},{loggedIn: true},{new: true, useFindAndModify: false});

    return { activityId: model.id, role: "Model", token: token, tokenExpiration: 4 };
  },
  modelLogout: async ({ args }) => {

    const modelLogout = await Model.findOneAndUpdate({ _id: args.modelId },{loggedIn: false},{new: true, useFindAndModify: false});

    return {
      ...model._doc,
      _id: model.id,
      email: model.contact.email ,
      name: model.name,
    };
  }
};
