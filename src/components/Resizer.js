import React from "react";
import { Button, ButtonGroup, Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  btn: {
    width: "200px",
  },
}));

export default function Resizer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="button" noWrap>
        Resizing Options
      </Typography>
      <Paper
        elevation={3}
        variant="outlined"
        children={
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button className={classes.btn}>25% Smaller</Button>
            <Button className={classes.btn}>50% Smaller</Button>
            <Button className={classes.btn}>75% Smaller</Button>
          </ButtonGroup>
        }
      />
    </div>
  );
}
