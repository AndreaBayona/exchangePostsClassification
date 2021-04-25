import React from 'react';
import {Question} from "./Question";

import {QData, QAns} from "./dataTemp";

import {AppStyle, Header} from './AppStyles';

function App() {
  return (
    <AppStyle>
      <Header>
        ReactApp
      </Header>
      <Question question={QData} acceptedAnswer={QAns} classifierName="Andrea"/>
    </AppStyle>
  );
}

export default App;
