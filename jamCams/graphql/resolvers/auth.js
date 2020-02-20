const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
const { pocketVariables } = require('../../helpers/pocketVars');

module.exports = {
  login: async ({ email, password }) => {

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User does not exist!');

    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign({ userId: user.id },'JammaCammaDingDong',{expiresIn: '2h'});

    pocketVariables.token = token;
    pocketVariables.userId = user.id;

    return { userId: user.id, token: token, tokenExpiration: 2 };
  }
};
