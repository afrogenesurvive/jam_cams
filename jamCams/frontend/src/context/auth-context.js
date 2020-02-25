import React from 'react';

export default React.createContext({
    token: null,
    userId: null,
    user: {},
    users:[],
    selectedUser: {},
    model: {},
    models:[],
    selectedModel: {},
    content: {},
    contents:[],
    selectedContent: {},
    show: {},
    shows:[],
    selectedShow: {},
    userAlert: null,
    file: null,
    fancyDate: null,
    login: (token, userId, tokenExpiration) => {},
    logout: () => {}
});
