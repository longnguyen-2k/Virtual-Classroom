import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link } from "react-router-dom";
import { Popover } from "@material-ui/core";
import { Button } from "reactstrap";
import { makeStyles } from "@material-ui/core/styles";
import CopyToClipboard from "react-copy-to-clipboard";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import dateFormat from "dateformat";
import getUser from "../../APIService/GetUser";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
  },
  drop_button: {
    marginTop: "-3.8rem",
    float: "right",
    marginRight: "2px",
  },
  detail: {
    color: "#007b83",
    textDecoration: "none !important",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: "#129eaf",
  },
}));
function CardMaterial(props) {
  const { id: userId } = getUser();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const idPopover = open ? "simple-popover" : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const deleteMaterial = (idMaterial) => {
    handleCloseDialog();
    props.delete(idMaterial);
  };
  const updateMaterial = () => {
    handleClose();
    update("update", null, data);
  };
  const {
    update,
    data,
    data: { id, content, title, createdAt, ownerId },
    idClass,
  } = props;
  return (
    <Card className={classes.root}>
      <CardHeader
        className={"card-header " + expanded}
        onClick={handleExpandClick}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <AssignmentIcon />
          </Avatar>
        }
        title={title}
        subheader={dateFormat(createdAt, "dd/mm/yyyy")}
      />
      <IconButton className={classes.drop_button} aria-label="settings">
        <Popover
          id={idPopover}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <CopyToClipboard
            text={window.location.href.replace(
              `classroom/${idClass}/material`,
              `${idClass}/material/${id}/detail`
            )}
          >
            <button className="btn-nor">Copy link</button>
          </CopyToClipboard>
          {userId === ownerId && (
            <div>
              <button className="btn-nor" onClick={updateMaterial}>
                Edit
              </button>
              <br />
              <button className="btn-nor" onClick={handleOpenDialog}>
                Delete
              </button>
            </div>
          )}
        </Popover>
        <MoreVertIcon onClick={handleClick} />
      </IconButton>
      <Collapse in={expanded} timeout="auto">
        <CardContent>
          <Typography className="title" paragraph>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Link to={"/" + idClass + "/material/" + id + "/detail"}>
            <Button color="link" className={classes.detail + " btn-detail"}>
              View material
            </Button>
          </Link>
        </CardActions>
      </Collapse>
      <Dialog
        onClose={handleCloseDialog}
        aria-labelledby="simple-dialog-title"
        className="dialog-m"
        open={openDialog}
      >
        <DialogTitle id="simple-dialog-title">Delete material?</DialogTitle>
        <div className="m-r">
          <button className="btn-cancel" onClick={handleCloseDialog}>
            Cancel
          </button>
          <button className="btn-continue" onClick={() => deleteMaterial(id)}>
            Delete
          </button>
        </div>
      </Dialog>
    </Card>
  );
}

export default CardMaterial;
