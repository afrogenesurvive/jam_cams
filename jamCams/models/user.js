const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  password: {type: String,required: true},
  name: {type: String,required: true},
  username: {type: String,required: true},
  dob:{type: Date},
  address: {
    number: {type:Number},
    street: {type: String},
    town: {type: String},
    city: {type:String},
    country: {type:String}
  },
  contact: {
    phone: {type: String},
    email: {type: String,required: true}
  },
  bio: {type: String},
  profileImages: [{
    name: {type:String},
    type: {type: String},
    path: {type: String}
  }],
  interests: [{type: String}],
  perks: [{
    date: {type: Date},
    name: {type: String},
    description: {type: String}
  }],
  models:[{type: Schema.Types.ObjectId,ref: 'Model'}],
  tokens: {type: Number},
  tags: [{type: String}]
  viewedShows: [{
    date: {type: Date},
    ref: {type: Schema.Types.ObjectId,ref: 'Show'}
  }],
  viewedContent: [{
    date: {type: Date},
    ref: {type: Schema.Types.ObjectId,ref: 'Content'}
  }],
  likedContent: [{
    date: {type: Date},
    ref: {type: Schema.Types.ObjectId,ref: 'Content'}
  }],
  searches: [{
    date: {type: Date},
    query: {type: String}
  }],
  comments: [{type: Schema.Types.ObjectId,ref: 'Comment'}],
  messages: [{type: Schema.Types.ObjectId,ref: 'Message'}],
  transactions: [{type: Schema.Types.ObjectId,ref: 'Transaction'}],
  billing: [{
    date: {type: Date},
    type: {type: String},
    description: {type: String},
    amount: {type: Number},
    paid: {type: Boolean},
    payment: {type: String}
  }],
  complaints: [{
    date: {type: Date},
    type: {type: String},
    description: {type: String},
    complainant: {type: Schema.Types.ObjectId,ref: 'Model'}
  }]
},
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
