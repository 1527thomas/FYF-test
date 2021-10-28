import React, { useState, useEffect } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import EndpointOnePage from "./components/EndpointOnePage";
import EndpointTwoPage from "./components/EndpointTwoPage";
import FormPage from "./components/FormPage";
import axios from "axios";

const App = () => {
  const [comboData, setComboData] = useState();

  const fetchComboData = async () => {
    const response = await axios.get("http://localhost:5000/flowersAPI/combo");
    setComboData(response.data);
  };

  useEffect(() => {
    fetchComboData();
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/endpointOne">
            <EndpointOnePage comboData={comboData} />
          </Route>
          <Route exact path="/form">
            <FormPage />
          </Route>
          <Route exact path="/endpointTwo">
            <EndpointTwoPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
