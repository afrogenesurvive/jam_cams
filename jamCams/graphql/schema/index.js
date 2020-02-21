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
  input UserInput {
    password: String
    name: String
    username: String
    dob: String
    addressNumber: Int
    addressStreet: String
    addressTown: String
    addressCity: String
    addressCountry: String
    contactPhone: String
    contactEmail: String
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
  input ModelInput {
    password: String
    name: String
    username: String
    modelName: String
    dob: String
    addressNumber: Int
    addressStreet: String
    addressTown: String
    addressCity: String
    addressCountry: String
    contactPhone: String
    contactEmail: String
    socialMediaPlatform: String
    socialMediaHandle: String
    bio: String
    traitKey: String
    traitValue: String
    profileImageName: String
    profileImagesType: String
    profileImagesPath: String
    interest: String
    perkDate: String
    perkName: String
    perkDescription: String
    token: Float
    tag: String
    category: String
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
    likeCount: Int
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
  input ContentInput {
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
    endDate: String
    endTime: String
    length: String
    creator: Model
    content: [Content]
    models: [Model]
    viewers: [User]
    chat: [Chat]
    tags: [String]
  }
  input ShowInput {
    type: String
    title: String
    description: String
    status: String
    scheduledDate: String
    scheduledTime: String
    endDate: String
    endTime: String
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
    model: Model
    comment: String
    parent: Comment
    children: [Comment]
  }
  input CommentInput {
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
  input MessageInput {
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
    read: Boolean
    show: Show
  }
  input ChatInput {
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
    receiverUser: User
    receiverModel: Model
    amount: Float
    description: String
    show: Show
  }
  input TransactionInput {
    date: String
    time: String
    type: String
    description: String
    amount: Float
  }

  type AuthData {
    id: ID!
    token: String!
    tokenExpiration: Int!
    error: String
  }

  type RootQuery {
    login(email: String!, password: String!): AuthData!

    users(activityId: ID!): [User]
    getUserId(activityId: ID!, userId: ID!): User
    getUserField(activityId: ID!, field: String!, query: String!): [User]
    getUserInterest(activityId: ID!, interest: String!): [User]
    getUserPerk(activityId: ID!, perkName: String!): [User]
    getUserToken(activityId: ID!, tokenAmount: Float!): [User]
    getUserTag(activityId: ID!, tag: String!): [User]
    getUserSearch(activityId: ID!, searchQuery: String!): [User]
    getUserBilling(activityId: ID!, billingKey: String!, billingValue: String!): [User]
    getUserComplaint(activityId: ID!, complaintKey: String!, complaintValue: String!): [User]
    getUserModel(activityId: ID!, modelId: ID!): [User]
    getUserViewedShow(activityId: ID!, showId: ID!): [User]
    getUserViewedContent(activityId: ID!, contentId: ID!): [User]
    getUserLikedContent(activityId: ID!, contentId: ID!): [User]
    getUserComment(activityId: ID!, commentId: ID!): [User]
    getUserMessage(activityId: ID!, messageId: ID!): [User]
    getUserTransaction(activityId: ID!, transactionId: ID!): [User]
    getThisUser(activityId: ID!): User

    models(activityId: ID!): [Model]
    getModelId(activityId: ID!, modelId: ID!): Model
    getModelField(activityId: ID!, field: String!, query: String!): [Model]
    getModelSocialMedia(activityId: ID!, socialMediaKey: String!, socialMediaValue: String!): Model
    getModelTrait(activityId: ID!, traitKey: String!, traitValue: String!): [Model]
    getModelProfileImage(activityId: ID!, profileImageKey: String!, profileImageValue: String!): [Model]
    getModelInterest(activityId: ID!, interest: String!): [Model]
    getModelPerk(activityId: ID!, perkKey: String!, perkValue: String!): [Model]
    getModelToken(activityId: ID!, tokens: Float!): [Model]
    getModelTag(activityId: ID!, tag: String!): [Model]
    getModelCategory(activityId: ID!, category: String!): [Model]
    getModelFan(activityId: ID!, fanId: ID!): [Model]
    getModelFriend(activityId: ID!, fanId: ID!): [Model]
    getModelShow(activityId: ID!, showId: ID!): [Model]
    getModelContent(activityId: ID!, contentId: ID!): [Model]
    getModelComment(activityId: ID!, commentId: ID!): [Model]
    getModelMessage(activityId: ID!, messageId: ID!): [Model]
    getModelTransaction(activityId: ID!, transactionId: ID!): [Model]
    getThisModel(activityId: ID!): Model

    content(activityId: ID!): [Content]
    getContentId(activityId: ID!, contentId: ID!): Content
    getContentField(activityId: ID!, field: String!, query: String!): [Content]
    getContentModel(activityId: ID!, modelId: ID!): [Content]
    getContentLikeCount(activityId: ID!, likeCount: Int!): [Content]
    getContentComment(activityId: ID!, commentId: ID!): [Content]
    getContentTag(activityId: ID!, tag: String!): [Content]

    shows(activityId: ID!): [Show]
    getShowId(activityId: ID!, showId: ID!): Show
    getShowField(activityId: ID!, field: String!, query: String!): [Show]
    getShowContent(activityId: ID!, contentId: ID!): [Show]
    getShowModel(activityId: ID!, modelId: ID!): [Show]
    getShowViewer(activityId: ID!, userId: ID!): [Show]
    getShowChat(activityId: ID!, chatId: ID!): [Show]
    getShowTag(activityId: ID!, tag: String!): [Show]

    comments(activityId: ID!): [Comment]
    getCommentId(activityId: ID!, commentId: ID!): Comment
    getCommentField(activityId: ID!, field: String!, query: String!): [Comment]
    getCommentContent(activityId: ID!, contentId: ID!): [Comment]
    getCommentUser(activityId: ID!, userId: ID!): [Comment]
    getCommentParent(activityId: ID!, commentId: ID!): [Comment]
    getCommentChild(activityId: ID!, commentId: ID!): [Comment]

    messages(activityId: ID!): [Message]
    getMessageId(activityId: ID!, messageId: ID!): Message
    getMessageField(activityId: ID!, field: String!, query: String!): [Message]
    getMessageSender(activityId: ID!, senderId: ID!): [Message]
    getMessageReceiver(activityId: ID!, receiverId: ID!): [Message]

    transactions(activityId: ID!): [Transaction]
    getTransactionId(activityId: ID!, transactionId: ID!): Transaction
    getTransactionField(activityId: ID!, field: String!, query: String!): [Transaction]
    getTransactionSender(activityId: ID!, senderId: ID!): [Transaction]
    getTransactionReceiver(activityId: ID!, receiverId: ID!): [Transaction]

    chats(chatId: ID!): [Chat]
    getChatId(activityId: ID!, chatId: ID!): Chat
    getChatField(activityId: ID!, field: String!, query: String!): [Chat]
    getChatSender(activityId: ID!, senderId: ID!): [Chat]
    getChatReceiver(activityId: ID!, receiverId: ID!): [Chat]

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
    deleteUser(userId: ID!): User

    createModel(modelInput: ModelInput!): Model
    updateModel(modelId: ID!, modelInput: ModelInput!): Model
    updateModelField(modelId: ID!, field: String!, query: String!): Model
    addModelSocialMedia(modelId: ID!, modelInput: ModelInput): Model
    addModelTrait(modelId: ID!, modelInput: ModelInput): Model
    addModelProfileImage(modelId: ID!, modelInput: ModelInput): Model
    addModelInterest(modelId: ID!, modelInput: ModelInput): Model
    addModelPerk(modelId: ID!, modelInput: ModelInput): Model
    addModelToken(modelId: ID!, modelInput: ModelInput): Model
    addModelTag(modelId: ID!, modelInput: ModelInput): Model
    addModelCategory(modelId: ID!, modelInput: ModelInput): Model
    addModelFan(modelId: ID!, fanId: ID!): Model
    addModelFriend(modelId: ID!, friendId: ID!): Model
    addModelShow(modelId: ID!, showId: ID!): Model
    addModelContent(modelId: ID!, contentID: ID!): Model
    addModelComment(modelId: ID!, commentId: ID!): Model
    addModelMessage(modelId: ID!, messageId: ID!): Model
    addModelTransaction(modelId: ID!, transactionId: ID!): Model
    deleteModel(modelId: ID!): Model

    createContent(creatorId: ID!, contentInput: ContentInput!): Content
    updateContent(contentId: ID!, contentInput: ContentInput!): Content
    updateContentField(modelId: ID!, field: String!, query: String!): Content
    addContentModel(contentId: ID!, modelId: ID!): Content
    addContentView(contentId: ID!, views: Int): Content
    addContentLikes(contentId: ID!, likes: Int): Content
    addContentComments(contentId: ID!, commentId: ID!): Content
    addContentTags(contentId: ID!, tag: String): Content
    deleteContent(contentId: ID!): Content

    createShow(modelId: ID!, showInput: ShowInput!): Show
    updateShow(showId: ID!, showInput: ShowInput!): Show
    addShowContent(showId: ID!, contentId: ID!): Show
    addShowModels(showId: ID!, modelId: ID!): Show
    addShowViewers(showId: ID!, viewerId: ID!): Show
    addShowChat(showId: ID!, chatId: ID!): Show
    addShowTags(showId: ID!, tag: String!): Show
    deleteShow(showId: ID!): Show

    createComment(contentId: ID!, userId: ID, modelId: ID, contentId: ID, parentId: ID, commentInput: CommentInput!): Comment
    deleteComment(commentId: ID!): Comment

    createChat(sender: String!,receiver: String!, senderId: ID!, receiverId: ID!, showId: ID!, chatInput: ChatInput!): Chat
    updateChatRead(chatId: ID!): Chat
    deleteChat(chatId: ID!): Chat

    createMessage(sender: String!,receiver: String!, senderId: ID!, receiverId: ID!, messageInput: MessageInput!): Message
    updateMessageRead(messageId: ID!): Message
    deleteMessage(messageId: ID!): Message

    createTransaction(senderId: ID!, receiverId: ID!, transactionInput: TransactionInput!): Transaction
    deleteTransaction(transactionId: ID!): Transaction
  }

  schema {
      query: RootQuery
      mutation: RootMutation
  }
`);
