import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
} from "react-router-dom";

import {AppStyle, Header} from "./AppStyles";
import PickEvaluator from "./PickEvaluator/index";
import {PickAnswersSet} from './PickAnswersSet/index';

function App() {
    return (
        <Router>
            <AppStyle>
                <Header>
                    <Link to="/">Home</Link>
                </Header>
                <Switch>
                    <Route exact path="/" component={PickEvaluator}/>
                    <Route exact path="/pickAnswers/:username" component={PickAnswersSet}/>
                </Switch>
            </AppStyle>
        </Router>
    );
}

export default App;
