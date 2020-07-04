import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Layout from "./Layout";
import Uploader from "./Uploader";
import Images from "./Images";

export default function App() {
  const [uploads, setUploads] = useState([]);
  const uploaderComponent = (
    <Uploader uploads={uploads} setUploads={setUploads} />
  );
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/upload">{uploaderComponent}</Route>
          <Route path="/images">
            <Images />
          </Route>
          <Route path="/">{uploaderComponent}</Route>
        </Switch>
      </Layout>
    </Router>
  );
}
