import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import PostDetails from "./components/PostDetails/PostDetails";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  console.log("🚀 ~ file: App.js:12 ~ App ~ user:", user);

  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Switch>
          {/* <Route
            exact
            path="/auth"
            render={() =>
              !user ? <Redirect to="/auth" /> : <Redirect to="/Posts" />
            }
          /> */}
          <Route path="/auth" exact component={Auth} />

          <Route
            path="/"
            exact
            render={() =>
              !user ? <Redirect to="/auth" /> : <Redirect to="/Posts" />
            }
          />
          <Route path="/Posts" exact component={Home} />
          <Route path="/Posts/search?" exact component={Home} />
          <Route path="/Post/:id" component={PostDetails} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
};
export default App;
