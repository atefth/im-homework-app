import React, { useState, useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "../utils/history";

import Layout from "./Layout";
import Uploader from "./Uploader";
import Images from "./Images";
import { uploadImages, fetchStatus, fetchImageUrl } from "../services/api";
import { uploadProgressStream, resizedImageStream } from "../services/io";

const App = () => {
  const [uploads, setUploads] = useState([]);
  const [visibility, setVisibility] = useState(false);
  const [resizeTo, setResizeTo] = useState(0.5);
  const [uploadProgress, setUploadProgress] = useState(undefined);
  const [images, setImages] = useState([]);
  const [redirected, setRedirected] = useState(false);

  useEffect(() => {
    uploadProgressStream(({ progress }) => {
      const rounded = Math.round(progress);
      setUploadProgress(rounded > 100 ? 100 : rounded);
    });
    resizedImageStream((data) => {
      updateResizedUrl(data);
    });
  });

  useEffect(() => {
    if (!uploads.length) setUploadProgress(undefined);
  }, [uploads]);

  useEffect(() => {
    if (uploadProgress && uploadProgress === 100) {
      setTimeout(() => {
        setRedirected(true);
        history.push("/images");
      }, 2000);
    }
  }, [uploadProgress]);

  const updateResizedUrl = ({ originalKey, resizedKey }) => {
    images.map(async (data, index) => {
      if (
        data.originalKey === originalKey &&
        !data.resizedKey &&
        !data.resizedUrl
      ) {
        const image = { ...data, resizedKey };
        image.resizedUrl = await fetchImageUrl(resizedKey);
        setImages([
          ...images.slice(0, index),
          image,
          ...images.slice(index + 1),
        ]);
      }
    });
  };

  const resize = () => {
    uploadImages({ uploads, visibility, resizeTo }, setImages, setUploads);
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
      resize={resize}
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
            <Images
              images={images}
              setImages={setImages}
              getStatus={fetchStatus}
              getImageUrl={fetchImageUrl}
              redirected={redirected}
            />
          </Route>
          <Route path="/">{uploaderComponent}</Route>
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
