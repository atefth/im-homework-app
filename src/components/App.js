import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Layout from "./Layout";
import Uploader from "./Uploader";
import Resizer from "./Resizer";

export default function App() {
  const [uploads, setUploads] = useState([]);
  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Uploader uploads={uploads} setUploads={setUploads} />
        </Grid>
        {uploads.length ? (
          <Grid item xs={12}>
            <Resizer />
          </Grid>
        ) : null}
      </Grid>
    </Layout>
  );
}
