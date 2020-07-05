import React from "react";
import {
  Button,
  ButtonGroup,
  Typography,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Public, VisibilityOff } from "@material-ui/icons";

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
  btnActive: {
    width: "200px",
    backgroundColor: `${theme.palette.success.light} !important`,
  },
}));

export default function Resizer({
  visibility,
  setVisibility,
  resizeTo,
  setResizeTo,
  uploadToS3,
}) {
  const classes = useStyles();
  const beginUpload = (size) => {
    setResizeTo(size);
    uploadToS3();
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={5} />
        <Grid item xs={2}>
          <Typography variant="button" noWrap>
            Resizing Options
          </Typography>
        </Grid>
        <Grid item xs={5} />
        <Grid item xs={3}>
          <FormControlLabel
            control={
              <Checkbox
                icon={<VisibilityOff />}
                checkedIcon={<Public />}
                name="visibility"
                value={visibility}
                onChange={(event, checked) => {
                  setVisibility(checked);
                }}
              />
            }
            label="Visibility"
          />
        </Grid>
        <Grid item xs={6}>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button
              className={resizeTo === 0.25 ? classes.btnActive : classes.btn}
              onClick={() => beginUpload(0.25)}
            >
              25% Smaller
            </Button>
            <Button
              className={resizeTo === 0.5 ? classes.btnActive : classes.btn}
              onClick={() => beginUpload(0.5)}
            >
              50% Smaller
            </Button>
            <Button
              className={resizeTo === 0.75 ? classes.btnActive : classes.btn}
              onClick={() => beginUpload(0.75)}
            >
              75% Smaller
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={3} />
      </Grid>
    </div>
  );
}
