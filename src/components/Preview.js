import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { DeleteRounded, GetApp } from "@material-ui/icons";
import ImageSkeleton from "./ImageSkeleton";

export default function Preview({
  uploads,
  setUploads,
  images,
  height,
  urlName,
}) {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
      height: height ? height : "203px",
      border: `3px dashed ${theme.palette.primary.light}`,
      borderRadius: "8px",
      padding: "8px",
    },
    ImageList: {
      flexWrap: "wrap",
      transform: "translateZ(0)",
      "li:only-child": {
        width: "100%;",
      },
    },
    gridTile: {
      height: height ? `${height - 20}px !important` : "100%",
      "& > .MuiImageListTile-tile": {
        height: height ? "inherit" : "100%",
      },
    },
    title: {
      fontSize: "13px",
      color: theme.palette.primary.contrastText,
    },
    subtitle: {
      fontSize: "10px",
      color: theme.palette.primary.contrastText,
    },
    titleBar: {
      background:
        "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.5) 70%, rgba(0,0,0,0.3) 100%)",
    },
    icon: {
      color: "#fff",
    },
    placeholder: {
      color: theme.palette.primary.light,
      margin: "auto",
      opacity: 0.5,
    },
  }));
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {uploads && uploads.length ? (
        <ImageList className={classes.ImageList} cols={uploads.length}>
          {uploads.map(({ data, file }, index) => {
            const { name, size } = file;
            return (
              <ImageListItem key={`${name}-${size}`}>
                <img src={data} alt={name} />
                <ImageListItemBar
                  title={name}
                  subtitle={<span>Size: {size}</span>}
                  classes={{
                    root: classes.titleBar,
                    title: classes.title,
                    subtitle: classes.subtitle,
                  }}
                  actionIcon={
                    <IconButton
                      aria-label={`Delete ${name}`}
                      className={classes.icon}
                      onClick={() => {
                        setUploads([
                          ...uploads.slice(0, index),
                          ...uploads.slice(index + 1, uploads.length),
                        ]);
                      }}
                    >
                      <DeleteRounded />
                    </IconButton>
                  }
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      ) : images && images.length ? (
        <ImageList className={classes.ImageList} cols={images.length}>
          {images.map((image, index) => {
            if (image && image[`${urlName}Key`] && image[`${urlName}Url`]) {
              const key = image[`${urlName}Key`];
              const size = image[`${urlName}Size`];
              const url = image[`${urlName}Url`];
              const fileName = key.split("/").slice(1).join("");
              return (
                <ImageListItem
                  className={classes.gridTile}
                  key={`${fileName}-${size}`}
                >
                  <img src={url} alt={fileName} />
                  <ImageListItemBar
                    title={fileName}
                    subtitle={<span>Size: {size}</span>}
                    classes={{
                      root: classes.titleBar,
                      title: classes.title,
                      subtitle: classes.subtitle,
                    }}
                    actionIcon={
                      url ? (
                        <IconButton
                          aria-label={`Download ${fileName}`}
                          className={classes.icon}
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = url;
                            link.download = url;
                            link.click();
                          }}
                        >
                          <GetApp />
                        </IconButton>
                      ) : (
                        <CircularProgress color="primary" />
                      )
                    }
                  />
                </ImageListItem>
              );
            } else {
              return <ImageSkeleton key={index} />;
            }
          })}
        </ImageList>
      ) : (
        <Typography variant="h6" noWrap className={classes.placeholder}>
          Image Previews
        </Typography>
      )}
    </div>
  );
}
