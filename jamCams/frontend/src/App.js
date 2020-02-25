import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import AuthPage from './pages/Auth';
import SignupPage from './pages/Signup';

import UserProfilePage from './pages/user/UserProfile';
import ModelProfilePage from './pages/model/ModelProfile';
import UsersPage from './pages/user/Users';
import ModelsPage from './pages/model/Models';
import ContentPage from './pages/contentContent';
import ShowsPage from './pages/show/Shows';
import MainNavigation from './components/Navigation/MainNavigation';
import AuthContext from './context/auth-context';

import './App.css';

class App extends Component {
  state = {
    token: null,
    userId: null,
    context: this.context,
    sessionCookiePresent: false,
  };

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.sessionStorageAuth = null;
  }

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({
       token: null,
       userId: null,
       sessionCookiePresent: null
      });
    sessionStorage.clear();
    this.context = {
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
      userAlert: "",
      file: null,
      fancyDate: null,
      login: this.login,
      logout: this.logout,
    }
  };


  componentDidMount() {

    if (sessionStorage.getItem('login info')) {

      let seshStore = sessionStorage.getItem('login info');
      this.context.token = seshStore.token;
      this.context.userId = seshStore.userId;
      this.setState({
        sessionCookiePresent: true,
        userId: seshStore.userId,
        token: seshStore.token,
        });
    }
  }

  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
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
              userAlert: "",
              file: null,
              fancyDate: null,
              login: this.login,
              logout: this.logout,
            }}
          >
            <MainNavigation />
            <main className="main-content">
              <Switch>

                { // logged in -> pages
                this.state.token && <Redirect from="/" to="/profile" exact />}
                {this.state.token && (<Route path="/users" component={UsersPage} />)}
                {this.state.token && (<Route path="/models" component={ModelsPage} />)}
                {this.state.token && (<Route path="/content" component={ContentPage} />)}
                {this.state.token && (<Route path="/shows" component={ShowsPage} />)}
                {this.state.token && (<Route path="/userProfile" component={UserProfile} />)}
                {this.state.token && (<Route path="/modelProfile" component={ModelProfile} />)}
                {this.state.token && (<Redirect from="/auth" to="/profile" exact />)}

                { //if not logged in -> go to login page
                !this.state.token && (<Route path="/auth" component={AuthPage} />)}
                {!this.state.token && (<Route path="/signup" component={SignupPage} />)}
                {!this.state.token && <Redirect to="/auth" exact />}
              </Switch>
            </main>

          </AuthContext.Provider>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default App;
