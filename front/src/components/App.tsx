import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {InputGroup, FormControl} from "react-bootstrap";
import {BrowserRouter as Router, Route, NavLink, Switch, useHistory} from "react-router-dom";
import PickEvaluator from './PickEvaluator/index';
import {PickAnswersSet} from "./PickAnswersSet";
import {AnswersPage} from "./AnswersPage";
import {AnswerPage} from "./AnswerPage";
import {AppStyle, Header, LinkOverride, SearchBox} from "./AppStyles";

function App() {
    const history = useHistory();

    return (
        <Router>
            <AppStyle>
                <Header>
                    <LinkOverride>
                        <NavLink to="/">Home</NavLink>
                    </LinkOverride>
                    <SearchBox>
                        <InputGroup size="sm">
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroup-sizing-sm">Search</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl onChange={(event) => {
                                history.push(`/answers/${event.target}`)
                            }}
                                         aria-label="Small"
                                         aria-describedby="inputGroup-sizing-sm"
                                         placeholder="Write answer id"
                            />
                        </InputGroup>
                    </SearchBox>
                </Header>
                <Switch>
                    <Route exact path="/" component={PickEvaluator}/>
                    <Route exact path="/pickAnswers/:username" component={PickAnswersSet}/>
                    <Route exact path="/answers/:username/:answersGroup" component={AnswersPage}/>
                    <Route exact path="/answers/:id" component={AnswerPage}/>
                </Switch>

            </AppStyle>
        </Router>
    );
}

export default App;
