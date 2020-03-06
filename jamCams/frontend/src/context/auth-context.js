import React from 'react';

export default React.createContext({
    token: null,
    activityId: null,
    role: null,
    userId: null,
    modelId: null,
    contentId: null,
    showId: null,
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
    userAlert: "...",
    file: null,
    fancyDate: null,
    login: (token, activityId, role, tokenExpiration) => {},
    logout: () => {}
});
