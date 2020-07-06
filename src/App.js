import React from 'react';
import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";

import Donate from "./components/donate.component";
import Alertbox from "./components/alertbox.component";

function App() {
  return (
    <Router>
      <Route path="/" component={Alertbox} />
      <Route path="/donate" component={Donate} />
    </Router>
  );
}

export default App;
