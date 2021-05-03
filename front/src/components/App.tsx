import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {InputGroup, FormControl, Button} from "react-bootstrap";
import {BrowserRouter as Router, Route, NavLink, Switch} from "react-router-dom";
import PickEvaluator from './PickEvaluator/index';
import {PickAnswersSet} from "./PickAnswersSet";
import {AnswersPage} from "./AnswersPage";
import {AnswerPage} from "./AnswerPage";
import {AppStyle, Header, LinkOverride, SearchBox, LinkButton} from "./AppStyles";

function App() {
    const [search, setSearch] = React.useState("");
    return (
        <Router>
            <AppStyle>
                <Header>
                    <LinkOverride>
                        <NavLink to="/">Home</NavLink>
                    </LinkOverride>
                    <SearchBox>
                        <InputGroup size="sm">
                            <FormControl
                                         aria-label="Small"
                                         aria-describedby="inputGroup-sizing-sm"
                                         placeholder="Write answer id"
                                         onChange={(e)=> setSearch(e.target.value)}
                            />
                            <InputGroup.Append>
                                <Button variant="secondary">
                                    <LinkButton>
                                        <NavLink to={`/answer/${search || 0}`}>Search</NavLink>
                                    </LinkButton>
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </SearchBox>
                </Header>
                <Switch>
                    <Route exact path="/" component={PickEvaluator}/>
                    <Route exact path="/pickAnswers/:username" component={PickAnswersSet}/>
                    <Route exact path="/answers/:username/:answersGroup" component={AnswersPage}/>
                    <Route exact path="/answer/:id" component={AnswerPage}/>
                </Switch>

            </AppStyle>
        </Router>
    );
}

export default App;
