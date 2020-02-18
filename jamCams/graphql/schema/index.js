const { buildSchema } = require('graphql');

module.exports = buildSchema(`

  type User {
    password: String
    name: String
    username: String
    dob: String
    address:
    contact:
    bio: String
    profileImages:
    interests:
    perks:
    models:
    tokens:
    tags:
    viewedShows:
    viewedContent:
    likedContent:
    searches:
    likes:
    comments:
    messages:
    transactions:
    billing:
    complaints:
  }

  type Address {
    number: Int
    street: String
    town: String
    city: String
    country: String
  }
  type Contact {
    phone: String
    email: String
  }
  type ProfileImage {
    name: String
    type: String
    path: String
  }
  type Perk {
    date: String
    name: String
    description: String
  }
  type ViewedShow {
    date: String
    ref: Show
  }
  type ViewedContent {
    date: String
    ref: Content
  }
  type LikedContent {
    date: String
    ref: Content
  }
  type Like {
    date: String
    ref: Content
  }
  type Search {
    date: String
    query: String
  }
  type Billing {
    date: String
    type: String
    description: String
    amount: Float
    paid: Boolean
    payment: String
  }
  type Complaint {
    date: String
    type: String
    description: String
    complainant: Model
  }

  type Model {
    password:
    name:
    username:
    modelNames:
    dob:
    address:
    contact:
    socialMedia:
    bio:
    traits:
    profileImages:
    interests:
    perks:
    tokens:
    fans:
    friends:
    tags:
    categories:
    shows:
    content:
    comments:
    comments:
    messages:
    transactions:
  }
  type SocialMedia {
    platform:
    handle:
  }
  type Trait {
    key:
    value:
  }

  type Content {
    date: {type: Date},
    type: {type: String},
    title: {type: String},
    fileType: {type: String},
    fileSize: {type: String},
    filePath: {type: String},
    models: [
      {type: Schema.Types.ObjectId,ref: 'Model'}
    ],
    viewCount: {type: Number},
    likes: [
      {
        date: {type: Date},
        user: {type: Schema.Types.ObjectId,ref: 'User'}
      }
    ],
    comments: [
      {type: Schema.Types.ObjectId,ref: 'Comment'}
    ],
    tags: [
      {type: String}
    ]
  }


  type AuthData {
    id: ID!
    token: String!
    tokenExpiration: Int!
    error: String
  }

  type RootQuery {

    login(email: String!, password: String!): AuthData!
  }

  type RootMutation {

  }

  schema {
      query: RootQuery
      mutation: RootMutation
  }
`);
