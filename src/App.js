import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from './Home';
import Article from './Article';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/article/:id" exact component={Article} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
