import React from "react";
import { Paper } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";

export default function Uploader() {
  return (
    <Paper
      elevation={3}
      variant="outlined"
      children={
        <DropzoneArea
          filesLimit={5}
          acceptedFiles={["image/*"]}
          dropzoneText={
            "Drag and drop up to 5 images here or click to begin resizing"
          }
          onChange={(files) => console.log("Files:", files)}
        />
      }
    />
  );
}
