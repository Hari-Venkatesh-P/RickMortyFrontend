import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { NotificationContainer } from "react-notifications";

import Store from "../src/redux/index"
import Home from "../src/screens/home";
import Dashboard from "../src/screens/dashboard";
import Login from "../src/screens/loginscreen";
import { ProtectedRoute } from "./utils/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <NotificationContainer />
        <Provider store={Store}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
              <ProtectedRoute exact path="/home" component={Home} />
            </Switch>
          </BrowserRouter>
        </Provider>
    </div>
  );
}

export default App;
