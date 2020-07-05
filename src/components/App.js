import React, { useState, useEffect } from "react";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import history from "../utils/history";

import Layout from "./Layout";
import Uploader from "./Uploader";
import Images from "./Images";
import { uploadProgressStream, uploadImages } from "../services/api";

const App = () => {
  const [uploads, setUploads] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [resizeTo, setResizeTo] = useState(0.5);
  const [uploadProgress, setUploadProgress] = useState(undefined);
  const [resizeProgress, setResizeProgress] = useState(0);

  useEffect(() => {
    uploadProgressStream(({ progress }) => {
      const rounded = Math.round(progress);
      setUploadProgress(rounded > 100 ? 100 : rounded);
    });
  }, []);

  useEffect(() => {
    if (uploadProgress && uploadProgress === 100) {
      setTimeout(() => {
        history.push("/images");
      }, 5000);
    }
  }, [uploadProgress]);

  const uploadToS3 = () => {
    uploadImages({ uploads, visibility, resizeTo });
    setUploadProgress(0);
  };

  const uploaderComponent = (
    <Uploader
      uploads={uploads}
      setUploads={setUploads}
      visibility={visibility}
      setVisibility={setVisibility}
      resizeTo={resizeTo}
      setResizeTo={setResizeTo}
      uploadProgress={uploadProgress}
      uploadToS3={uploadToS3}
    />
  );
  return (
    <Router history={history}>
      <Layout history={history}>
        <Switch>
          <Route exact path="/upload">
            {uploaderComponent}
          </Route>
          <Route exact path="/images">
            <Images />
          </Route>
          <Route path="/">{uploaderComponent}</Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
