import { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { AuthContext } from './shared/context/authContext';
import Home from './Home';
import Article from './Article';
import Login from './SignIn';

let logoutTimer;

function App() {
  const [userId, setUserId] = useState(null);
  const [expiredTime, setExpiredTime] = useState(null);

  const login = useCallback((uid, expiration) => {
    const sessionExpiration =
      expiration || new Date(Date.now() + 1000 * 60 * 60);
    setUserId(uid);
    setExpiredTime(sessionExpiration);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        userId: uid,
        expiration: sessionExpiration.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setUserId(null);
    setExpiredTime(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    if (userId && expiredTime) {
      const remainingTime = expiredTime.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [userId, expiredTime, logout]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));
    if (
      storedData &&
      storedData.userId &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(storedData.userId, new Date(storedData.expiration));
    } else {
      logout();
    }
  }, [login, logout]);

  let routes;
  if (!!userId) {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/article/:id" exact component={Article} />
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/login" exact component={Login} />
        <Redirect to="/login" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{ userId: userId, login, logout }}>
      <BrowserRouter>{routes}</BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
