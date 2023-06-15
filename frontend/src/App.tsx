import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import { TopBar } from "./components/TopBar";

export const App = () => {
  return (
    <Router>
      <div className="App">
        <TopBar />
        <Switch>
          <Route exact path="/" />
        </Switch>
      </div>
    </Router>
  );
};
