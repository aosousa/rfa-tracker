import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
export const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  );
};
