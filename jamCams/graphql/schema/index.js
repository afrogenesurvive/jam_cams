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
    file: File
    creator: Model
    models: [Model]
    viewCount: Int
    likes: [ContentLike]
    comments: [Comment]
    tags: [String]
  }
  type File {
    name: String
    type: String
    size: String
    path: String
  }
  type ContentLike {
    date: String
    user: User
  }
  type ContentInput {
    date: String
    type: String
    title: String
    fileName: String
    fileType: String
    fileSize: String
    filePath: String
    views: Int
    likeDate: String
    tag: String
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
    content: [Content]
    models: [Model]
    viewers: [User]
    chat: [Chat]
    tags: [String]
  }
  type ShowInput {
    type: String
    title: String
    description: String
    status: String
    scheduledDate: String
    scheduledTime: String
    airedDate: String
    airedTime: String
    length: String
    tag: String
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
  type CommentInput {
    date: String
    time: String
    type: String
    comment: String
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
  type MessageInput {
    date: String
    time: String
    type: String
    subject: String
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
  type ChatInput {
    date: String
    time: String
    type: String
    message: String
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
  type TransactionInput {
    date: String
    time: String
    type: String
    description: String
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
    updateUser(userId: ID!, userInput: UserInput!): User
    updateUserField(userId: ID!, field: String!, query: String!): User
    addUserInterest(userId: ID!, userInput: UserInput!): User
    addUserPerk(userId: ID!, userInput: UserInput!): User
    addUserToken(userId: ID!, userInput: UserInput!): User
    addUserTag(userId: ID!, userInput: UserInput!): User
    addUserSearch(userId: ID!, userInput: UserInput!): User
    addUserBilling(userId: ID!, userInput: UserInput!): User
    addUserComplaint(userId: ID!, userInput: UserInput!): User
    addUserModel(userId: ID!, modelId: ID!): User
    addUserViewedShow(userId: ID!, showId: ID!): User
    addUserViewedContent(userId: ID!, contentId: ID!): User
    addUserLikedContent(userId: ID!, contentId: ID!): User
    addUserComment(userId: ID!, commentId: ID!): User
    addUserMessage(userId: ID!, messageId: ID!): User
    addUserTransaction(userId: ID!, transactionId: ID!): User

    createModel(modelInput: ModelInput!): Model
    updateModel(modelId: ID!, modelInput: ModelInput!): Model
    addModelSocialMedia(modelId: ID!, modelInput: ModelInput): Model
    addModelTrait(modelId: ID!, modelInput: ModelInput): Model
    addModelProfileImage(modelId: ID!, modelInput: ModelInput): Model
    addModelInterest(modelId: ID!, modelInput: ModelInput): Model
    addModelPerk(modelId: ID!, modelInput: ModelInput): Model
    addModelToken(modelId: ID!, modelInput: ModelInput): Model
    addModelTag(modelId: ID!, modelInput: ModelInput): Model
    addModelCategory(modelId: ID!, modelInput: ModelInput): Model
    fans:
    friends:
    shows:
    content:
    comments:
    messages:
    transactions:

    createContent(modelId: ID!, contentInput: ContentInput!): Content
    models:
    likes:
    comments:
    tags:

    createShow(modelId: ID!, showInput: ShowInput!): Show
    content:
    models:
    viewers:
    chat:
    tags:

    createComment(userId: ID, modelId: ID, contentId: ID, parentId: ID, commentInput: CommentInput!): Comment
    children:
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
