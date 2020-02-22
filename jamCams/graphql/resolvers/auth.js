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
    const token = jwt.sign({ userId: user.id },'JammaCammaDingDong',{expiresIn: '2h'});

    // pocketVariables.token = token;
    // pocketVariables.userId = user.id;

    return { userId: user.id, token: token, tokenExpiration: 2 };
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
    const token = jwt.sign({ modelId: model.id },'JammaCammaPingPong',{expiresIn: '2h'});

    return { modelId: model.id, token: token, tokenExpiration: 2 };
  }
};
