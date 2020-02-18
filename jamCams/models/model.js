const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const modelSchema = new Schema({
  password: {type: String,required: true},
  name: {type: String,required: true},
  username: {type: String,required: true},
  modelNames: [
    {type: String}
  ],
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
  socialMedia: [{
    platform: {type:String},
    handle: {type:String}
  }]
  bio: {type: String},
  traits: [{
    key: {type:String},
    value: {type:String}
  }],
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
  tokens: {type: Number},
  fans: [
    {type: Schema.Types.ObjectId,ref: 'User'}
  ],
  friends: [{type: Schema.Types.ObjectId,ref: 'Model'}],
  tags: [{type: String}],
  categories: [{type: String}],
  shows: [{type: Schema.Types.ObjectId,ref: 'Show'}],
  content: [{type: Schema.Types.ObjectId,ref: 'Content'}],
  comments: [{type: Schema.Types.ObjectId,ref: 'Comment'}],
  messages: [{{type: Schema.Types.ObjectId,ref: 'Message'],
  transactions: [{type: Schema.Types.ObjectId,ref: 'Transaction'}]
},
  { timestamps: true }
);

module.exports = mongoose.model('Model', modelSchema);
