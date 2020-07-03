import React from "react";
import { Grid, Paper } from "@material-ui/core";
import { DropzoneAreaBase } from "material-ui-dropzone";
import Preview from "./Preview";

export default function Uploader({ uploads, setUploads }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper
          elevation={3}
          variant="outlined"
          children={
            <DropzoneAreaBase
              fileObjects={uploads}
              filesLimit={5}
              acceptedFiles={["image/*"]}
              dropzoneText={
                "Drag and drop upto 5 images here or click to being resizing"
              }
              maxFileSize={1000000000}
              showAlerts={["error"]}
              showPreviewsInDropzone={false}
              previewText={"Review Uploaded Images"}
              onAdd={(data) => setUploads(data)}
              onAlert={(message, variant) =>
                console.log(`${variant}: ${message}`)
              }
            />
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Preview uploads={uploads} setUploads={setUploads} />
      </Grid>
    </Grid>
  );
}
