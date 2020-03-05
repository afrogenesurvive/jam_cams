const { buildSchema } = require('graphql');

module.exports = buildSchema(`

  type User {
    _id: ID!
    password: String
    name: String
    role: String
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
    loggedin: Boolean
    viewedShows: [Show]
    viewedContent: [Content]
    likedContent: [Content]
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
    postalCode: String
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
  input ProfileImageInput {
    name: String
    type: String
    path: String
  }
  type Perk {
    date: String
    name: String
    description: String
    imageLink: String
  }
  input PerkInput {
    date: String
    name: String
    description: String
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
    role: String
    username: String
    dob: String
    addressNumber: Int
    addressStreet: String
    addressTown: String
    addressCity: String
    addressCountry: String
    addressPostalCode: String
    contactPhone: String
    contactEmail: String
    bio: String
    profileImageName: String
    profileImageType: String
    profileImagePath: String
    interest: String
    interests: String
    perkDate: String
    perkName: String
    perkDescription: String
    perkImageLink: String
    tokens: Float
    tag: String
    tags: String
    loggedIn: Boolean
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
    _id: ID
    password: String
    name: String
    role: String
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
    loggedIn: String
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
  input SocialMediaInput {
    platform: String
    handle: String
  }
  type Trait {
    key: String
    value: String
  }
  input TraitInput {
    key: String
    value: String
  }
  input ModelInput {
    password: String
    name: String
    role: String
    username: String
    modelName: String
    dob: String
    addressNumber: Int
    addressStreet: String
    addressTown: String
    addressCity: String
    addressCountry: String
    addressPostalCode: String
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
    tokens: Float
    tag: String
    loggedIn: Boolean
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
    author: Author
    comment: String
    parent: Comment
    children: [Comment]
  }
  type Author {
    role: String
    ref: ID
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
    sender: Author
    receiver: Author
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
    sender: Author
    receiver: Author
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
    sender: Author
    receiver: Author
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

  type UserAuthData {
    activityId: ID!
    role: String!
    token: String!
    tokenExpiration: Int!
    error: String
  }
  type ModelAuthData {
    activityId: ID!
    role: String!
    token: String!
    tokenExpiration: Int!
    error: String
  }

  type RootQuery {
    userLogin(email: String!, password: String!): UserAuthData!
    userLogout(activityId: ID!, userId: ID!): User!
    modelLogin(email: String!, password: String!): ModelAuthData!
    modelLogout(activityId: ID!, modelId: ID!): Model!


    users(activityId: ID!): [User]
    getUserId(activityId: ID!, userId: ID!): User
    getUserNameRegex(activityId: ID!, regex: String!): User!
    getUserField(activityId: ID!, field: String!, query: String!): [User]
    getUserInterests(activityId: ID!, interests: [String!]): [User]
    getUserPerks(activityId: ID!, perkNames: [String!]): [User]
    getUserTokenAmount(activityId: ID!, tokenAmount: Float!): [User]
    getUserTags(activityId: ID!, tags: [String!]): [User]
    getUserSearchQueries(activityId: ID!, searchQueries: [String!]): [User]
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
    getModelNameRegex(activityId: ID!, regex: String!): User
    getModelField(activityId: ID!, field: String!, query: String!): [Model]
    getModelSocialMedia(activityId: ID!, socialMediaKey: String!, socialMediaValue: String!): Model
    getModelTraits(activityId: ID!, traits: [TraitInput!]): [Model]
    getModelProfileImage(activityId: ID!, profileImageKey: String!, profileImageValue: String!): [Model]
    getModelInterests(activityId: ID!, interests: [String!]): [Model]
    getModelPerks(activityId: ID!, perkNames: [String!]): [Model]
    getModelTokenAmount(activityId: ID!, tokenAmount: Float!): [Model]
    getModelTags(activityId: ID!, tags: [String!]): [Model]
    getModelCategories(activityId: ID!, categories: [String!]): [Model]
    getModelFan(activityId: ID!, fanId: ID!): [Model]
    getModelFriend(activityId: ID!, friendId: ID!): [Model]
    getModelShow(activityId: ID!, showId: ID!): [Model]
    getModelContent(activityId: ID!, contentId: ID!): [Model]
    getModelComment(activityId: ID!, commentId: ID!): [Model]
    getModelMessage(activityId: ID!, messageId: ID!): [Model]
    getModelTransaction(activityId: ID!, transactionId: ID!): [Model]
    getThisModel(activityId: ID!): Model

    content(activityId: ID!): [Content]
    getContentId(activityId: ID!, contentId: ID!): Content
    getContentField(activityId: ID!, field: String!, query: String!): [Content]
    getContentCreator(activityId: ID!, creatorId: ID!): [Content]
    getContentModel(activityId: ID!, modelId: ID!): [Content]
    getContentLikeCount(activityId: ID!, likeCount: Int!): [Content]
    getContentComment(activityId: ID!, commentId: ID!): [Content]
    getContentTags(activityId: ID!, tags: [String!]): [Content]

    shows(activityId: ID!): [Show]
    getShowId(activityId: ID!, showId: ID!): Show
    getShowField(activityId: ID!, field: String!, query: String!): [Show]
    getShowContent(activityId: ID!, contentId: ID!): [Show]
    getShowCreator(activityId: ID!, creatorId: ID!): [Show]
    getShowModel(activityId: ID!, modelId: ID!): [Show]
    getShowViewer(activityId: ID!, viewerId: ID!): [Show]
    getShowChat(activityId: ID!, chatId: ID!): [Show]
    getShowTags(activityId: ID!, tags: [String!]): [Show]

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

    chats(activityId: ID!): [Chat]
    getChatId(activityId: ID!, chatId: ID!): Chat
    getChatField(activityId: ID!, field: String!, query: String!): [Chat]
    getChatSender(activityId: ID!, senderId: ID!): [Chat]
    getChatReceiver(activityId: ID!, receiverId: ID!): [Chat]

  }

  type RootMutation {
    createUser(userInput: UserInput!): User
    updateUser(activityId: ID!, userId: ID!, userInput: UserInput!): User
    updateUserField(activityId: ID!, userId: ID!, field: String!, query: String!): User
    addUserInterests(activityId: ID!, userId: ID!, userInput: UserInput!): User
    addUserProfileImage(activityId: ID!, userId: ID!, userInput: UserInput): User
    addUserPerks(activityId: ID!, userId: ID!, perks: [PerkInput]): User
    addUserPerk(activityId: ID!, userId: ID!, userInput: UserInput): User
    addUserTokens(activityId: ID!, userId: ID!, userInput: UserInput!): User
    addUserTags(activityId: ID!, userId: ID!, userInput: UserInput!): User
    addUserSearch(activityId: ID!, userId: ID!, userInput: UserInput!): User
    addUserBilling(activityId: ID!, userId: ID!, userInput: UserInput!): User
    editUserBillingPaid(activityId: ID!, userId: ID!, date: String!, amount: Float!): User
    addUserComplaint(activityId: ID!, userId: ID!, complainantId: ID!, userInput: UserInput!): User
    addUserModel(activityId: ID!, userId: ID!, modelId: ID!): User
    addUserViewedShow(activityId: ID!, userId: ID!, showId: ID!, date: String!): User
    addUserViewedContent(activityId: ID!, userId: ID!, contentId: ID!, date: String!): User
    addUserLikedContent(activityId: ID!, userId: ID!, contentId: ID!, date: String!): User
    addUserComment(activityId: ID!, userId: ID!, commentId: ID!): User
    addUserMessage(activityId: ID!, userId: ID!, messageId: ID!): User
    addUserTransaction(activityId: ID!, userId: ID!, transactionId: ID!): User

    deleteUser(activityId: ID!, userId: ID!): User
    deleteUserInterests(activityId: ID!, userId: ID!, userInput: UserInput!): User
    deleteUserPerks(activityId: ID!, userId: ID!, perkNames: [String!]): User
    deleteUserPerk(activityId: ID!, userId: ID!, userInput: UserInput!): User
    deleteUserTags(activityId: ID!, userId: ID!, userInput: UserInput!): User
    deleteUserProfileImage(activityId: ID!, userId: ID!, userInput: UserInput!): User
    deleteUserSearches(activityId: ID!, userId: ID!, searchQueries: [String!]): User
    deleteUserBilling(activityId: ID!, userId: ID!, userInput: UserInput!): User
    deleteUserComplaint(activityId: ID!, userId: ID!, userInput: UserInput!): User
    deleteUserModel(activityId: ID!, userId: ID!, modelId: ID!): User
    deleteUserLikedContent(activityId: ID!, userId: ID!, likedContentId: ID!): User
    deleteUserComment(activityId: ID!, userId: ID!, commentId: ID!): User
    deleteUserMessage(activityId: ID!, userId: ID!, messageId: ID!): User
    deleteUserTransaction(activityId: ID!, userId: ID!, transactionId: ID!): User


    createModel(modelInput: ModelInput!): Model
    updateModel(activityId: ID!, modelId: ID!, modelInput: ModelInput!): Model
    updateModelField(activityId: ID!, modelId: ID!, field: String!, query: String!): Model
    addModelSocialMedia(activityId: ID!, modelId: ID!, socialMedia: [SocialMediaInput!]): Model
    addModelTrait(activityId: ID!, modelId: ID!, modelInput: ModelInput!): Model
    addModelTraits(activityId: ID!, modelId: ID!, traits: [TraitInput!]): Model
    addModelProfileImage(activityId: ID!, modelId: ID!, modelInput: ModelInput): Model
    addModelInterests(activityId: ID!, modelId: ID!, userInput: UserInput!): Model
    addModelPerk(activityId: ID!, modelId: ID!, modelInput: ModelInput): Model
    addModelPerks(activityId: ID!, modelId: ID!, perks: [PerkInput!]): Model
    addModelTokens(activityId: ID!, modelId: ID!, modelInput: ModelInput): Model
    addModelTags(activityId: ID!, modelId: ID!, tags: [String!]): Model
    addModelCategories(activityId: ID!, modelId: ID!, categories: [String!]): Model
    addModelFan(activityId: ID!, modelId: ID!, fanId: ID!): Model
    addModelFriend(activityId: ID!, modelId: ID!, friendId: ID!): Model
    addModelShow(activityId: ID!, modelId: ID!, showId: ID!): Model
    addModelContent(activityId: ID!, modelId: ID!, contentID: ID!): Model
    addModelComment(activityId: ID!, modelId: ID!, commentId: ID!): Model
    addModelMessage(activityId: ID!, modelId: ID!, messageId: ID!): Model
    addModelTransaction(activityId: ID!, modelId: ID!, transactionId: ID!): Model

    deleteModel(activityId: ID!, modelId: ID!): Model
    deleteModelTraits(activityId: ID!, modelId: ID!, traits: [TraitInput!]): Model
    deleteModelInterests(activityId: ID!, modelId: ID!, interests: [String!]): Model
    deleteModelSocialMedia(activityId: ID!, modelId: ID!, socialMedia: [SocialMediaInput!]): Model
    deleteModelProfileImage(activityId: ID!, modelId: ID!, profileImageName: String!): Model
    deleteModelPerks(activityId: ID!, modelId: ID!, perkNames: [String!]): Model
    deleteModelTags(activityId: ID!, modelId: ID!, tags: [String!]): Model
    deleteModelCategories(activityId: ID!, modelId: ID!, categories: [String!]): Model
    deleteModelFan(activityId: ID!, modelId: ID!, fanId: ID!): Model
    deleteModelFriend(activityId: ID!, userId: ID!, friendId: ID!): Model

    createContent(activityId: ID!, creatorId: ID!, contentInput: ContentInput!): Content
    updateContent(activityId: ID!, contentId: ID!, contentInput: ContentInput!): Content
    updateContentField(activityId: ID!, modelId: ID!, field: String!, query: String!): Content
    addContentModel(activityId: ID!, contentId: ID!, modelId: ID!): Content
    addContentLikes(activityId: ID!, contentId: ID!, userId: ID!): Content
    addContentViews(activityId: ID!, contentId: ID!): Content
    addContentComments(activityId: ID!, contentId: ID!, commentId: ID!): Content
    addContentTags(activityId: ID!, contentId: ID!, tags: [String!]): Content

    deleteContent(activityId: ID!, contentId: ID!): Content
    deleteContentComment(activityId: ID!, contentId: ID!, commentId: ID!): Content
    deleteContentTags(activityId: ID!, contentId: ID!, tags: [String!]): Content

    createShow(activityId: ID!, modelId: ID!, showInput: ShowInput!): Show
    updateShow(activityId: ID!, showId: ID!, showInput: ShowInput!): Show
    addShowContent(activityId: ID!, showId: ID!, contentId: ID!): Show
    addShowModel(activityId: ID!, showId: ID!, modelId: ID!): Show
    addShowViewer(activityId: ID!, showId: ID!, viewerId: ID!): Show
    addShowChat(activityId: ID!, showId: ID!, chatId: ID!): Show
    addShowTags(activityId: ID!, showId: ID!, tags: [String!]): Show

    deleteShow(activityId: ID!, showId: ID!): Show
    deleteShowTags(activityId: ID!, showId: ID!, tags: [String!]): Show
    deleteShowViewer(activityId: ID!, showId: ID!, viewerId: ID!): Show
    deleteShowModel(activityId: ID!, showId: ID!, modelId: ID!): Show
    deleteShowContent(activityId: ID!, showId: ID!, contentId: ID!): Show

    createRootComment(authorId: ID!, authorRole: String!, contentId: ID, commentInput: CommentInput!): Comment
    createComment(authorId: ID!, authorRole: String!, contentId: ID, parentId: ID, commentInput: CommentInput!): Comment
    setCommentParent(commentId: ID!, parentId: ID!): Comment
    addCommentChild(commentId: ID!, childId: ID!): Comment
    deleteComment(commentId: ID!): Comment

    createChat(senderRole: String!, receiverRole: String!, senderId: ID!, receiverId: ID!, chatInput: ChatInput!, showId: ID!): Chat
    updateChatRead(chatId: ID!): Chat
    deleteChat(chatId: ID!): Chat

    createMessage(senderRole: String!, receiverRole: String!, senderId: ID!, receiverId: ID!, messageInput: MessageInput!): Message
    updateMessageRead(messageId: ID!): Message
    deleteMessage(messageId: ID!): Message

    createTransaction(senderRole: String!, receiverRole: String!, senderId: ID!, receiverId: ID!, transactionInput: TransactionInput!): Transaction
    deleteTransaction(transactionId: ID!): Transaction
  }

  schema {
      query: RootQuery
      mutation: RootMutation
  }
`);
