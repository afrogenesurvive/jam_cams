const DataLoader = require('dataloader');
const User = require('../../models/user');
const Model = require('../../models/model');
const Content = require('../../models/content');
const Show = require('../../models/show');
const Comment = require('../../models/comment');
const Message = require('../../models/message');
const Chat = require('../../models/chat');
const Transaction = require('../../models/transaction');
const { dateToString } = require('../../helpers/date');

const userLoader = new DataLoader(userIds => {
  return users(userIds);
});


const users = async userIds => {
  try {
    const users = await User.find({ _id: { $in: userIds } });
    users.sort((a, b) => {
      return (
        userIds.indexOf(a._id.toString()) - userIds.indexOf(b._id.toString())
      );
    });
    return users.map(user => {
      return transformUser(user);
    });
  } catch (err) {
    throw err;
  }
};
const models = async modelIds => {
  try {
    const models = await Model.find({ _id: { $in: modelIds } });
    models.sort((a, b) => {
      return (
        modelIds.indexOf(a._id.toString()) - modelIds.indexOf(b._id.toString())
      );
    });
    return models.map(model => {
      return transformModel(model);
    });
  } catch (err) {
    throw err;
  }
};
const content = async contentIds => {
  try {
    const content = await Content.find({ _id: { $in: contentIds } });
    content.sort((a, b) => {
      return (
        contentIds.indexOf(a._id.toString()) - contentIds.indexOf(b._id.toString())
      );
    });
    return content.map(content => {
      return transformContent(content);
    });
  } catch (err) {
    throw err;
  }
};
const shows = async showIds => {
  try {
    const shows = await Show.find({ _id: { $in: showIds } });
    shows.sort((a, b) => {
      return (
        showIds.indexOf(a._id.toString()) - showIds.indexOf(b._id.toString())
      );
    });
    return shows.map(show => {
      return transformShow(show);
    });
  } catch (err) {
    throw err;
  }
};
const comments = async commentIds => {
  try {
    const comments = await Comment.find({ _id: { $in: commentIds } });
    comments.sort((a, b) => {
      return (
        commentIds.indexOf(a._id.toString()) - commentIds.indexOf(b._id.toString())
      );
    });
    return comments.map(comment => {
      return transformComment(comment);
    });
  } catch (err) {
    throw err;
  }
};
const messages = async messageIds => {
  try {
    const messages = await Message.find({ _id: { $in: messageIds } });
    messages.sort((a, b) => {
      return (
        messageIds.indexOf(a._id.toString()) - messageIds.indexOf(b._id.toString())
      );
    });
    return messages.map(message => {
      return transformMessage(message);
    });
  } catch (err) {
    throw err;
  }
};
const chats = async chatIds => {
  try {
    const chats = await Chat.find({ _id: { $in: chatIds } });
    chats.sort((a, b) => {
      return (
        chatIds.indexOf(a._id.toString()) - chatIds.indexOf(b._id.toString())
      );
    });
    return chats.map(chat => {
      return transformChat(chat);
    });
  } catch (err) {
    throw err;
  }
};
const transactions = async transactionIds => {
  try {
    const transactions = await Transaction.find({ _id: { $in: transactionIds } });
    transactions.sort((a, b) => {
      return (
        transactionIds.indexOf(a._id.toString()) - transactionIds.indexOf(b._id.toString())
      );
    });
    return transactions.map(transaction => {
      return transformTransaction(transaction);
    });
  } catch (err) {
    throw err;
  }
};


const singleUser = async userId => {
  try {
    const user = await userLoader.load(userId.toString());
    return user;
  } catch (err) {
    throw err;
  }
};
const singleModel = async modelId => {
  try {
    const model = await modelLoader.load(modelId.toString());
    return model;
  } catch (err) {
    throw err;
  }
};
const singleContent = async contentId => {
  try {
    const content = await contentLoader.load(contentId.toString());
    return content;
  } catch (err) {
    throw err;
  }
};
const singleShow = async showId => {
  try {
    const show = await showLoader.load(showId.toString());
    return show;
  } catch (err) {
    throw err;
  }
};
const singleComment = async commentId => {
  try {
    const comment = await commentLoader.load(commentId.toString());
    return comment;
  } catch (err) {
    throw err;
  }
};
const singleMessage = async messageId => {
  try {
    const message = await messageLoader.load(messageId.toString());
    return message;
  } catch (err) {
    throw err;
  }
};
const singleChat = async chatId => {
  try {
    const chat = await chatLoader.load(chatId.toString());
    return chat;
  } catch (err) {
    throw err;
  }
};
const singleTransaction = async transactionId => {
  try {
    const transaction = await transactionLoader.load(transactionId.toString());
    return transaction;
  } catch (err) {
    throw err;
  }
};


const transformUser = user => {
  return {
    ...user._doc,
    _id: user.id,
    name: user.name,
    email: user.email,
  };
};
const transformModel = model => {
  return {
    ...model._doc,
    _id: model.id,
    name: model.name,
    email: model.email,
  };
};
const transformContent = content => {
  return {
    ...content._doc,
    _id: content.id,
    date: content.date,
    title: content.title,
  };
};
const transformShow = show => {
  return {
    ...show._doc,
    _id: show.id,
    type: show.type,
    title: show.title,
  };
};
const transformComment = comment => {
  return {
    ...comment._doc,
    _id: comment.id,
    date: comment.date,
    time: comment.time,
  };
};
const transformMessage = message => {
  return {
    ...message._doc,
    _id: message.id,
    date: message.date,
    time: message.time,
  };
};
const transformChat = chat => {
  return {
    ...chat._doc,
    _id: chat.id,
    date: chat.date,
    time: chat.time,
  };
};
const transformTransaction = transaction => {
  return {
    ...transaction._doc,
    _id: transaction.id,
    date: transaction.date,
    time: transaction.time,
  };
};


exports.transformUser = transformUser;
exports.transformModel = transformModel;
exports.transformContent = transformContent;
exports.transformShow = transformShow;
exports.transformComment = transformComment;
exports.transformMessage = transformMessage;
exports.transformChat = transformChat;
exports.transformTransaction = transformTransaction;
