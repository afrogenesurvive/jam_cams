const authResolver = require('./auth');
const userResolver = require('./user');
const modelResolver = require('./model');
const contentResolver = require('./content');
const showResolver = require('./show');
const commentResolver = require('./comment');
const messageResolver = require('./message');
const chatResolver = require('./chat');
const transactionResolver = require('./transaction');


const rootResolver = {
  ...authResolver,
  ...userResolver,
  ...modelResolver,
  ...contentResolver,
  ...showResolver,
  ...commentResolver,
  ...messageResolver,
  ...chatResolver,
  ...transactionResolver
};

module.exports = rootResolver;
