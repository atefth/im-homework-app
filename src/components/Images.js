import React, { useState, useEffect } from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Images = ({ images, uploadedImages, resizeStatus, uploadedStatus }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (!images.length) resizeStatus();
    if (!uploadedImages.length) uploadedStatus();
  }, []);

  useEffect(() => {
    if (images.length) {
      console.log("images", images);
    }
    if (uploadedImages.length) {
      console.log("uploadedImages", uploadedImages);
    }
  }, [images, uploadedImages]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleToggle}>
        Show backdrop
      </Button>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default Images;
