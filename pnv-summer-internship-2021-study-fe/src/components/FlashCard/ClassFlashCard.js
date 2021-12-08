import React, { useEffect, useState } from 'react';
import Col from 'reactstrap/lib/Col';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Rating from '@material-ui/lab/Rating';
import { Button } from 'reactstrap';
import { Box } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { MdDelete, MdShare } from 'react-icons/md';
import ModalAction from '../Modal';
import FormAction from '../Form';
import CreateIcon from '@material-ui/icons/Create';
import { Link } from 'react-router-dom';
import FlashCardService from '../../APIService/FlashCardService';
import Row from 'reactstrap/lib/Row';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Backdrop from '../Backdrop';
import { Popover } from '@material-ui/core';
import CopyToClipboard from 'react-copy-to-clipboard';
import { ACTIONS } from '../constants';
function ClassFlashCard(props) {
  const [data, setData] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [idDeleteClass, setIdDeleteClass] = useState(null);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const openPopover = Boolean(anchorEl);
  const [modal, setModal] = useState({
    title: '',
    open: false,
    body: '',
  });
  useEffect(() => {
    fetchData();
  }, []);
  const idPopover = openPopover ? 'simple-popover' : undefined;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const fetchData = async () => {
    const response = await FlashCardService.getClass();
    setData(response.data);
  };
  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleConfirmDeleteClass = (idClass) => {
    handleOpenDialog();
    setIdDeleteClass(idClass);
  };
  let dataForm = {
    name: null,
    color: null,
    backgroundImage: null,
    rating: 1,
  };
  const success = () => {
    setOpenBackdrop(false);
    closeModal();
    fetchData();
  };
  const handleSubmit = async (data) => {
    setOpenBackdrop(true);
    await FlashCardService.addClass(data);
    success();
  };
  const handleUpdate = async (data) => {
    const { id } = data;
    setOpenBackdrop(true);
    await FlashCardService.updateClass(id, data);
    success();
  };
  const hnadleUpdateStar = async (numberStar, id) => {
    setOpenBackdrop(true);
    const data = {
      star: numberStar,
    };
    await FlashCardService.updateClass(id, data);
    success();
  };
  const createAction = (action, nameClass, data) => {
    switch (action) {
      case ACTIONS.CREATE:
        setModal({
          body: (
            <FormAction
              structure={createFieldForm(dataForm)}
              titleSubmit="Create"
              dataForm={dataForm}
              submit={handleSubmit}
            ></FormAction>
          ),
          title: 'Create class',
          open: true,
        });
        break;
      case ACTIONS.EDIT:
        const { id, name, color, backgroundImage } = data;
        dataForm = {
          id: id,
          name: name,
          color: color,
          backgroundImage: backgroundImage,
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
          title: 'Update class',
          open: true,
        });
        break;
      default:
        break;
    }
  };
  const createFieldForm = (data) => {
    const { name, color, backgroundImage } = data;
    const structure = [
      {
        fill: 'name',
        type: 'text',
        value: name,
      },
      {
        fill: 'color',
        type: 'color',
        value: color,
      },
      {
        fill: 'backgroundImage',
        type: 'text',
        value: backgroundImage,
      },
    ];
    return structure;
  };
  const closeModal = () => {
    setModal({
      open: false,
    });
  };

  const deleteClass = async () => {
    setOpenDialog(false);
    setOpenBackdrop(true);
    await FlashCardService.deleteClass(idDeleteClass);
    success();
  };
  const { title, body, open } = modal;
  return (
    <Col md={12}>
      <Button
        variant="contained"
        className="btn-add"
        onClick={() => createAction('create')}
      >
        + Add class
      </Button>
      <Row>
        {data &&
          data.map((e, key) => {
            const { id, name, userName, color, backgroundImage, star } = e;
            return (
              <Col lg={4} md={6} sm={12} className="fl-col">
                <Card className="fl-card">
                  <CardActionArea>
                    <Link to={`/flashcard/${id}/lesson`} className="link">
                      <CardContent
                        className="fl-cl-cr-ct"
                        style={{
                          backgroundImage: `url(${backgroundImage})`,
                          backgroundColor: color,
                        }}
                      >
                        <Typography gutterBottom variant="h5" component="h2">
                          {name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          className="text-white"
                          component="p"
                        >
                          {userName}
                        </Typography>
                      </CardContent>
                    </Link>
                  </CardActionArea>
                  <hr className="c-hr" />
                  <CardActions>
                    <Rating
                      value={star}
                      onChange={(event, newValue) =>
                        hnadleUpdateStar(newValue, id)
                      }
                    />
                    <Box style={{ marginLeft: 'auto' }}>
                      <Button size="small" color="link" className="action">
                        <MdShare onClick={handleClick} />
                        <Popover
                          id={idPopover}
                          open={openPopover}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                          }}
                        >
                          <CopyToClipboard
                            text={window.location.href.replace(
                              'flashcard',
                              `flashcard/${id}/lesson`
                            )}
                          >
                            <button className="btn-nor">Copy link</button>
                          </CopyToClipboard>
                        </Popover>
                      </Button>
                      <Button
                        size="small"
                        color="link"
                        className="action"
                        onClick={() => createAction('update', '', e)}
                      >
                        <CreateIcon />
                      </Button>
                      <Button
                        aria-label="delete"
                        color="gray"
                        className="action danger"
                        onClick={() => handleConfirmDeleteClass(id)}
                      >
                        <MdDelete />
                      </Button>
                    </Box>
                  </CardActions>
                </Card>
              </Col>
            );
          })}
      </Row>
      <Dialog
        onClose={handleCloseDialog}
        aria-labelledby="simple-dialog-title"
        className="dialog-m"
        open={openDialog}
      >
        <DialogTitle id="simple-dialog-title">Delete Class?</DialogTitle>
        <div className="m-r">
          <button className="btn-cancel" onClick={handleCloseDialog}>
            Cancel
          </button>
          <button className="btn-continue" onClick={deleteClass}>
            Delete
          </button>
        </div>
      </Dialog>
      <Backdrop openBackdrop={openBackdrop} />
      <ModalAction
        open={open}
        body={body}
        title={title}
        close={closeModal}
      ></ModalAction>
    </Col>
  );
}

export default ClassFlashCard;
