import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    BrowserRouter as Router,
    Route,
    Link,
} from "react-router-dom";

import { AppStyle, Header } from "./AppStyles";
import PickEvaluator from "./PickEvaluator/index";

function App() {
  return (
    <AppStyle>
        <Header>
            <Router>
                <Link to="/">Home</Link>
                <Route path="/" component={PickEvaluator}/>
            </Router>
        </Header>
    </AppStyle>
  );
}

export default App;
