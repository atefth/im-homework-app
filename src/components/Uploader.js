import React from "react";
import { Grid, Paper, Typography, LinearProgress } from "@material-ui/core";
import { DropzoneAreaBase } from "material-ui-dropzone";
import Preview from "./Preview";
import Resizer from "./Resizer";

export default function Uploader({
  uploads,
  setUploads,
  visibility,
  setVisibility,
  resizeTo,
  setResizeTo,
  uploadProgress,
  uploadToS3,
}) {
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
            />
          }
        />
      </Grid>
      <Grid item xs={12}>
        <Preview uploads={uploads} setUploads={setUploads} />
      </Grid>
      {uploadProgress !== undefined ? (
        <>
          <Grid item xs={1}>
            <Typography variant="button" noWrap>
              {uploadProgress < 100 ? "Uploading..." : "Upload Complete!"}
            </Typography>
          </Grid>
          <Grid item xs={11}>
            <div
              style={{ width: "98%", marginLeft: "28px", paddingTop: "10px" }}
            >
              <LinearProgress variant="determinate" value={uploadProgress} />
            </div>
          </Grid>
        </>
      ) : null}
      {uploads.length ? (
        <Grid item xs={12}>
          <Resizer
            visibility={visibility}
            setVisibility={setVisibility}
            setResizeTo={setResizeTo}
            uploadToS3={uploadToS3}
          />
        </Grid>
      ) : null}
    </Grid>
  );
}
