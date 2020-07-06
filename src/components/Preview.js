import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { DeleteRounded, GetApp } from "@material-ui/icons";

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
    gridList: {
      flexWrap: "nowrap",
      transform: "translateZ(0)",
      "li:only-child": {
        width: "100%;",
      },
    },
    gridTile: {
      height: height ? `${height - 20}px !important` : "100%",
      "& > .MuiGridListTile-tile": {
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
        <GridList className={classes.gridList} cols={uploads.length}>
          {uploads.map(({ data, file }, index) => {
            const { name, size } = file;
            return (
              <GridListTile key={`${name}-${size}`}>
                <img src={data} alt={name} />
                <GridListTileBar
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
              </GridListTile>
            );
          })}
        </GridList>
      ) : images && images.length ? (
        <GridList className={classes.gridList} cols={images.length}>
          {images.map((image) => {
            if (image && image[`${urlName}Key`]) {
              const key = image[`${urlName}Key`];
              const size = image[`${urlName}Size`];
              const url = image[`${urlName}Url`];
              const fileName = key.split("/").slice(1).join("");
              return (
                <GridListTile
                  className={classes.gridTile}
                  key={`${fileName}-${size}`}
                >
                  <img src={url} alt={fileName} />
                  <GridListTileBar
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
                </GridListTile>
              );
            }
          })}
        </GridList>
      ) : (
        <Typography variant="h6" noWrap className={classes.placeholder}>
          Image Previews
        </Typography>
      )}
    </div>
  );
}
