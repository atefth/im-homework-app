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

const Images = ({ images, setImages, getStatus, getImageUrl, redirected }) => {
  const classes = useStyles();
  const [fetchingUrls, setFetchingUrls] = useState(true);

  useEffect(() => {
    if (!redirected) {
      (async () => {
        const data = await getStatus();
        if (data.length) {
          setImages(data);
        } else {
          setFetchingUrls(false);
        }
      })();
    }
  }, []);

  useEffect(() => {
    if (images && images.length && fetchingUrls) {
      fetchUrls();
    }
  }, [images]);

  const fetchUrls = async () => {
    const promises = images.map(async (data, index) => {
      const { originalKey, originalUrl, resizedKey, resizedUrl } = data;
      const image = { ...data };
      if (!originalUrl && originalKey) {
        image.originalUrl = await getImageUrl(originalKey);
      }
      if (!resizedUrl && resizedKey && !redirected) {
        image.resizedUrl = await getImageUrl(resizedKey);
      }
      return Promise.resolve(image);
    });
    setFetchingUrls(false);
    Promise.all(promises).then((imagesWithUrls) => {
      setImages(imagesWithUrls);
    });
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" noWrap>
            Original Images
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Preview images={images} height={320} urlName="original" />
        </Grid>
        <Divider variant="fullWidth" />
        <Grid item xs={12}>
          <Typography variant="h4" noWrap>
            Resized Images
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Preview images={images} height={320} urlName="resized" />
        </Grid>
      </Grid>
      <Backdrop className={classes.backdrop} open={fetchingUrls}>
        <CircularProgress color="secondary" />
      </Backdrop>
    </div>
  );
};

export default Images;
