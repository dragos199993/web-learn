import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import decode from 'jwt-decode';

//Redux related import
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './components/rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoggedIn } from './actions/auth';
import './style/style.css';
import setAuthorizationHeader from './utils/setAuthorizationHeader';

const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)));

if(localStorage.questionerJWT){
    const payload = decode(localStorage.questionerJWT);
    const user = { token: localStorage.questionerJWT, email: payload.email, confirmed: payload.confirmed };
    setAuthorizationHeader(localStorage.questionerJWT); 
    store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <Route component={App}  />
        </Provider>
    </Router>
, document.getElementById('root'));
