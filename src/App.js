import React, { useState, useEffect } from 'react'
import { auth } from './firebase'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ChatPage from './ChatPage'
import SignInPage from './SignInPage'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/chat">
          <ChatPage />
        </Route>
        <Route path="/">
          <SignInPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
