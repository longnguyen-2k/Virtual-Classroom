import React, { useState, useEffect } from "react";
import FormAction from "./Form";
import { IconButton, Typography, CardContent, Card } from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import ModalAction from "./Modal";
import StreamService from "../APIService/StreamService";
import { Backdrop, Box, Button, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useParams } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import Row from "reactstrap/lib/Row";
import Ckeditor from "./Ckeditor";
import clsx from "clsx";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import FormControl from "@material-ui/core/FormControl";
import { OutlinedInput } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import CardComment from "../components/Card/CardComment";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import { FormGroup, Input, Label } from "reactstrap";
import Col from "reactstrap/lib/Col";
import getUser from "../APIService/GetUser";
import { ACTIONS } from "./constants";
const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    width: "100%",
    backgroundColor: "transparent",
  },
  avatar: {
    backgroundColor: "#129eaf",
    width: "3rem",
    height: "3rem",
    marginTop: "-0.5rem",
  },
  margin: {
    width: "100%",
  },
  detail: {
    color: "gray",
    textDecoration: "none !important",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));
export default function Stream() {
  const { avatar, id: userId } = getUser();
  const [showInput, setShowInput] = useState(false);
  const [sendButton, setAction] = useState(true);
  const [comment, setComment] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [idAnnouncementDelete, setIdAnnouncementDelete] = useState(null);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  let [dataForm, setDataForm] = useState({
    title: null,
    content: null,
    fileAttachment: null,
  });
  const [submit, setSubmit] = useState(true);
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [modal, setModal] = useState({
    title: null,
    body: null,
    open: false,
  });

  async function fetchData() {
    const response = await StreamService.getQuestion(idClass);

    await Promise.all(
      response.data.map(async (post) => {
        const { id: postId } = post;
        const comments = await StreamService.getCommentQuestion(
          idClass,
          postId
        );
        post.comments = comments.data;
      })
    );
    setData(response.data);
  }
  const handleChange = (e) => {
    const {
      target: { name, value },
    } = e;
    if (value && name === "content") {
      setSubmit(false);
    }
    setDataForm({
      [name]: value,
    });
  };
  const handleChangeComment = (e) => {
    const {
      target: { value },
    } = e;
    setComment(value);
    setAction(!value.length);
  };
  const handleSubmitComment = async (postId) => {
    const data = {
      message: comment,
    };
    handleOpenBackdrop();
    await StreamService.postComment(idClass, postId, data);
    setComment("");
    success();
  };
  const handleDeleteComment = async (commentId, postId) => {
    handleOpenBackdrop();
    handleCloseDialog();
    try {
      await StreamService.deleteComment(idClass, postId, commentId);
    } catch {}
    success();
  };
  const handleConfirmDeleteAnnouncement = (announcementId) => {
    handleOpenDialog();
    setIdAnnouncementDelete(announcementId);
  };
  const handleUpload = (e) => {
    const {
      target: { files },
    } = e;
    const name = "fileAttachment";
    setDataForm({
      ...dataForm,
      [name]: files[0],
    });
  };
  const handleOpenBackdrop = () => {
    setOpenBackdrop(true);
  };
  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleCloseModal = () => {
    setModal({
      open: false,
    });
  };
  const createAction = (action, data) => {
    switch (action) {
      case ACTIONS.EDIT:
        dataForm = {
          title: data.title,
          content: data.content,
          file: data.fileAttachment,
          id: data.id,
        };
        setModal({
          body: (
            <FormAction
              structure={createFieldForm(data)}
              titleSubmit="Update"
              dataForm={dataForm}
              submit={handleUpdate}
            ></FormAction>
          ),
          title: "Update announcement",
          open: true,
        });
        break;
      default:
        break;
    }
  };
  const createFieldForm = (data) => {
    const { title, content, fileAttachment } = data;
    const structure = [
      {
        fill: "title",
        type: "text",
        value: title,
      },
      {
        fill: "content",
        type: "textarea",
        value: content,
      },
      {
        fill: "fileAttachment",
        type: "file",
        value: fileAttachment,
      },
    ];
    return structure;
  };
  const success = () => {
    setDataForm({
      title: null,
      content: null,
      fileAttachment: null,
    });
    handleCloseBackdrop();
    handleCloseModal();
    fetchData();
  };
  const handleUpdate = async (data) => {
    handleOpenBackdrop();
    const response = await StreamService.putQuestion(idClass, data.id, data);
    fetchData();
    if (response.statusText == "OK") {
      handleCloseModal();
      handleCloseBackdrop();
    }
  };
  const handleChangeCkeditor = (value, fill) => {
    setSubmit(!value.length);
    setDataForm({ ...dataForm, [fill]: value });
  };
  const handlePost = async () => {
    handleOpenBackdrop();
    await StreamService.postQuestion(idClass, dataForm);
    success();
  };
  const handleReadFile = (url) => {
    setModal({
      open: true,
      body: <iframe src={url} title="file" width="100%" height="600"></iframe>,
    });
  };
  const deleteAnnouncement = async () => {
    handleCloseDialog();
    handleOpenBackdrop();
    await StreamService.deletePost(idClass, idAnnouncementDelete);
    fetchData();
    handleCloseBackdrop();
  };
  const { idClass } = useParams();
  const { open, body, title } = modal;
  return (
    <Box className="contain">
      <div className="main__announcementsWrapper">
        <div className="main__ancContent">
          {showInput ? (
            <Box>
              <FormGroup>
                <Label className="l-b">
                  <b>Title</b>
                </Label>
                <Input
                  className="frm-input"
                  name="title"
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label className="l-b">
                  <b>Content</b>
                </Label>
                <Ckeditor change={handleChangeCkeditor} fill="content" />
              </FormGroup>
              <div className="main__buttons">
                <input onChange={handleUpload} type="file" />
              </div>
              <Row className="stream-action">
                <Button color="light" onClick={() => setShowInput(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handlePost}
                  disabled={submit}
                  className="btn-post"
                >
                  Post
                </Button>
              </Row>
            </Box>
          ) : (
            <div
              className="main__wrapper100"
              onClick={() => setShowInput(true)}
            >
              <Avatar />
              <div>Announce Something to class</div>
            </div>
          )}
        </div>
      </div>
      <br />
      <br />
      {data &&
        data.map((e) => {
          const {
            ownerName,
            ownerId,
            createdAt,
            id,
            fileAttachment,
            listComments,
            title,
            content,
            ownerAvatar,
            comments,
          } = e;
          return (
            <div className="amt">
              <div className="amt__Cnt">
                <div className="amt__top">
                  <Avatar src={ownerAvatar} />
                  <div>
                    <Typography variant="h6" component="subtitle2">
                      {ownerName}
                    </Typography>
                    <br />
                    <Typography variant="caption" component="OVERLINE">
                      {createdAt}
                    </Typography>
                  </div>
                  {userId === ownerId && (
                    <div className="left">
                      <IconButton
                        color="link"
                        aria-label="settings"
                        onClick={() => handleConfirmDeleteAnnouncement(id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="settings"
                        onClick={() => createAction("update", e)}
                      >
                        <CreateIcon />
                      </IconButton>
                    </div>
                  )}
                </div>
                <p className="amt__txt">
                  <Typography variant="h6" component="subtitle2">
                    {title}
                  </Typography>
                </p>
                <p className="amt__txt">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </p>
                {fileAttachment.length && (
                  <a onClick={() => handleReadFile(fileAttachment[0])}>
                    <Card className="card-m-d">
                      <Row>
                        <img
                          className="m-img"
                          src="https://www.npmjs.com/npm-avatar/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdmF0YXJVUkwiOiJodHRwczovL3MuZ3JhdmF0YXIuY29tL2F2YXRhci9jMWU2NmFhMTQxOWJjOTM4NGM5ZDg0ZDQ0MDgyNzg5Mz9zaXplPTEwMCZkZWZhdWx0PXJldHJvIn0.6OId2QLxu0DcnhrtsTijFS0RliMJzIql3zetwijVTrk"
                        ></img>
                        <CardContent>File Attachment</CardContent>
                      </Row>
                    </Card>
                  </a>
                )}
              </div>
              <hr className="hr-c" />
              <CardContent>
                <Row>
                  <SupervisorAccountIcon />
                  <h6>
                    <b className="c-t">{comments.length} Class Comment</b>
                  </h6>
                </Row>
                <Row>
                  <Col md="12">
                    <FormControl
                      className={clsx(classes.margin, classes.textField)}
                      variant="outlined"
                    >
                      <Row className="comment">
                        <Col md={1} sm={4}>
                          <Avatar className="avartar" src={avatar} />
                        </Col>
                        <Col md={11} sm={8}>
                          <OutlinedInput
                            id="outlined-adornment-weight"
                            value={comment}
                            className="i-r"
                            onChange={handleChangeComment}
                            endAdornment={
                              <button
                                disabled={sendButton}
                                onClick={() => handleSubmitComment(id)}
                                className={`${classes.detail} btn-send`}
                              >
                                <SendIcon
                                  className="btn-send"
                                  disabled={sendButton}
                                />
                              </button>
                            }
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                              "aria-label": "weight",
                            }}
                            labelWidth={0}
                          />
                        </Col>
                      </Row>
                    </FormControl>
                    <Row>
                      {listComments &&
                        comments.map((e) => {
                          return (
                            <CardComment
                              deleteComment={() =>
                                handleDeleteComment(e.id, id)
                              }
                              data={e}
                            />
                          );
                        })}
                    </Row>
                  </Col>
                </Row>
              </CardContent>
            </div>
          );
        })}
      <ModalAction
        open={open}
        close={handleCloseModal}
        body={body}
        title={title}
      ></ModalAction>
      <Backdrop className={classes.backdrop} open={openBackdrop}>
        <CircularProgress color="secondary" />
      </Backdrop>
      <Dialog
        onClose={handleCloseDialog}
        aria-labelledby="simple-dialog-title"
        className="dialog-m"
        open={openDialog}
      >
        <DialogTitle id="simple-dialog-title">Delete announcement?</DialogTitle>
        <div className="m-r">
          <button className="btn-cancel" onClick={handleCloseDialog}>
            Cancel
          </button>
          <button className="btn-continue" onClick={deleteAnnouncement}>
            Delete
          </button>
        </div>
      </Dialog>
    </Box>
  );
}
