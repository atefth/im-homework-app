import React, { useState, useEffect } from "react";
import {
  Backdrop,
  CircularProgress,
  Grid,
  Typography,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Preview from "./Preview";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Images = ({
  images,
  setImages,
  uploadedImages,
  setUploadedImages,
  resizeStatus,
  uploadedStatus,
  getImage,
}) => {
  const classes = useStyles();
  const [loadedUploadedImages, setLoadedUploadedImages] = useState(true);

  useEffect(() => {
    if (!images.length) resizeStatus();
    if (!uploadedImages.length) uploadedStatus();
  }, []);

  useEffect(() => {
    if (images.length) {
      images.map(({ Key, url }, index) => {
        if (!url)
          setTimeout(() => {
            getImage({ key: Key, index }, images, setImages);
          }, 2000);
      });
    }
    if (uploadedImages.length) {
      uploadedImages.map(({ Key, url }, index) => {
        if (!url)
          setTimeout(() => {
            getImage({ key: Key, index }, uploadedImages, setUploadedImages);
          }, 2000);
      });
    }
    setTimeout(() => {
      if (!uploadedImages.length) setLoadedUploadedImages(false);
    }, 3000);
  }, [images, uploadedImages]);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" noWrap>
            Original Images
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Preview images={uploadedImages} height={320} />
        </Grid>
        <Divider variant="fullWidth" />
        <Grid item xs={12}>
          <Typography variant="h4" noWrap>
            Resized Images
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Preview images={images} height={320} />
        </Grid>
      </Grid>
      <Backdrop className={classes.backdrop} open={loadedUploadedImages}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </div>
  );
};

export default Images;
