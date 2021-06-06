import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ReadPage } from "./pages/Read";
import { CreatePage } from "./pages/Create";
import { UpdatePage } from "./pages/Update";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={ReadPage} />
          <Route path="/create" exact component={CreatePage} />
          <Route path="/update/:id" exact component={UpdatePage} />
        </Switch>
      </Router>
    );
  }
}

export default App;
