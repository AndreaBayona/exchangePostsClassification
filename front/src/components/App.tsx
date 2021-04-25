import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { AppStyle } from "./AppStyles";
import PickEvaluator from "./PickEvaluator/index";

function App() {
  return (
    <AppStyle>
      <PickEvaluator></PickEvaluator>
    </AppStyle>
  );
}

export default App;
