const { buildSchema } = require('graphql');

module.exports = buildSchema(`

  type User {
    _id: ID!
    password: String
    name: String
    username: String
    dob: String
    address: Address
    contact: Contact
    bio: String
    profileImages: [ProfileImage]
    interests: [String]
    perks: [Perk]
    models: [Model]
    tokens: Float
    tags: [String]
    viewedShows: [ViewedShow]
    viewedContent: [ViewedContent]
    likedContent: [LikedContent]
    searches:[Search]
    comments: [Comment]
    messages: [Message]
    transactions: [Transaction]
    billing: [Billing]
    complaints: [Complaint]
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
  type UserInput {
    password: String
    name: String
    username: String
    dob: String
    address: String
    number:Int
    street: String
    town: String
    city: String
    country: String
    contact: String
    phone: String
    email: String
    bio: String
    profileImagenName: String
    profileImageType: String
    profileImagePath: String
    interest: String
    perkDate: String
    perkName: String
    perkDescription: String
    tokens: Float
    tag: String
    searchDate: String
    searchQuery: String
    billingDate: String
    billingType: String
    billingDescription: String
    billingAmount: Float
    billingPaid: Boolean
    billingPayment: String
    complaintDate: String
    complaintType: String
    complaintDescription: String
    complaintComplainant: String
  }

  type Model {
    _id: ID!
    password: String
    name: String
    username: String
    modelNames: [String]
    dob: String
    address: Address
    contact: Contact
    socialMedia: [SocialMedia]
    bio: String
    traits: [Trait]
    profileImages: [ProfileImage]
    interests: [String]
    perks:[Perk]
    tokens: Float
    fans: [User]
    friends:[Model]
    tags: [String]
    categories: [String]
    shows: [Show]
    content: [Content]
    comments: [Comment]
    messages: [Message]
    transactions: [Transaction]
  }
  type SocialMedia {
    platform: String
    handle: String
  }
  type Trait {
    key: String
    value: String
  }
  type ModelInput {
    password:
    name:
    username:
    modelName:
    dob:
    addressNumber:
    addressStreet:
    addressTown:
    addressCity:
    addressCountry:
    contactPhone:
    contactEmail:
    socialMediaPlatform:
    socialMediaHandle:
    bio:
    traitKey:
    traitValue:
    profileImageName:
    profileImagesType:
    profileImagesPath:
    interest:
    perkDate:
    perkName:
    perkDescription:
    token:
    tag:
    category:
  }

  type Content {
    _id: ID!
    date: String
    type: String
    title: String
    fileType: String
    fileSize: String
    filePath: String
    models: [Model]
    viewCount: Int
    likes: [ContentLike]
    comments: [Comment]
    tags: [String]
  }
  type ContentLike {
    date: String
    user: User
  }
  type ContentInput {

  }

  type Show {
    _id: ID!
    type: String
    title: String
    description: String
    status: String
    scheduledDate: String
    scheduledTime: String
    airedDate: String
    airedTime: String
    length: String
    creator: Model
    models: [Model]
    viewers: [User]
    chat: [Chat]
    tags: [String]
  }

  type Comment {
    _id: ID!
    date: String
    time: String
    type: String
    content: Content
    user: User
    comment: String
    parent: Comment
    children: [Comment]
  }

  type Message {
    _id: ID!
    date: String
    time: String
    type: String
    subject: String
    senderUser: User
    senderModel: Model
    receiverUser: User
    receiverModel: Model
    message: String
    read: Boolean
  }

  type Chat {
    _id: ID!
    date: String
    time: String
    type: String
    senderUser: User
    senderModel: Model
    receiverUser: User
    receiverModel: Model
    message: String
    show: Show
  }

  type Transaction {
    _id: ID!
    date: String
    time: String
    type: String
    senderUser: User
    senderModel: Model
    amount: Float
    description: String
    show: Show
  }

  type AuthData {
    id: ID!
    token: String!
    tokenExpiration: Int!
    error: String
  }

  type RootQuery {
    login(email: String!, password: String!): AuthData!
    users(userId: ID!): [User]
  }

  type RootMutation {
    createUser(userInput: UserInput!): User
    createModel(modelInput: ModelInput!): Model
    createContent(contentInput: ContentInput!): Content
    createShow(showInput: ShowInput!): Show
    createComment(commentInput: CommentInput!): Comment
    createChat(chatInput: ChatInput!): Chat
    createMessage(messageInput: MessageInput!): Message
    createTransaction(transactionInput: TransactionInput!): Transaction
    deleteUser(userId: ID!, selectedUserId: ID!): User
  }

  schema {
      query: RootQuery
      mutation: RootMutation
  }
`);
