import { Avatar, CardHeader, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Col from 'reactstrap/lib/Col';
import Card from '@material-ui/core/Card';
import DeleteIcon from '@material-ui/icons/Delete';
import { Rating } from '@material-ui/lab';
import { Button } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import FormAction from '../Form';
import ModalAction from '../Modal';
import CreateIcon from '@material-ui/icons/Create';
import FlashCardService from '../../APIService/FlashCardService';
import Row from 'reactstrap/lib/Row';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import BackdropEffect from '../Backdrop';
import { ACTIONS } from '../constants';
const useStyles = makeStyles({
  root: {
    backgroundColor: '#296068 !important',
  },
  action: {
    marginTop: '0.6rem',
  },
});
function LessonFlashCard(props) {
  const [backdrop, setBackdrop] = useState(false);
  const { myclassId } = useParams();
  const [data, setData] = useState(null);
  const [idDeleteLesson, setIdDeleteLesson] = useState(null);
  const [modal, setModal] = useState({
    title: '',
    open: false,
    body: '',
  });
  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const success = () => {
    setBackdrop(false);
    closeModal();
    fetchData();
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleConfirmDeleteLesson = (idLesson) => {
    handleOpenDialog();
    setIdDeleteLesson(idLesson);
  };
  const style = useStyles();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await FlashCardService.getLesson(myclassId);
    setData(response.data);
  };
  let dataForm = {
    name: null,
  };
  const handleSubmit = async (data) => {
    setBackdrop(true);
    await FlashCardService.addLesson(myclassId, data);
    success();
  };
  const handleUpdate = async (data) => {
    const { id } = data;
    setBackdrop(true);
    await FlashCardService.updateLesson(myclassId, id, data);
    success();
  };
  const deleteLesson = async () => {
    setOpenDialog(false);
    setBackdrop(true);
    await FlashCardService.deleteLesson(myclassId, idDeleteLesson);
    success();
  };
  const hnadleUpdateStar = async (numberStar, id) => {
    setBackdrop(true);
    const data = {
      star: numberStar,
    };
    await FlashCardService.updateLesson(myclassId, id, data);
    success();
  };
  const createAction = (action, data) => {
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
          title: 'Create lesson',
          open: true,
        });
        break;
      case ACTIONS.EDIT:
        const { id, name } = data;
        dataForm = {
          id: id,
          name: name,
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
          title: 'Update lesson',
          open: true,
        });
        break;
      default:
        break;
    }
  };
  const createFieldForm = (data) => {
    const { name } = data;
    const structure = [
      {
        fill: 'name',
        type: 'text',
        value: name,
      },
    ];
    return structure;
  };
  const closeModal = () => {
    setModal({
      open: false,
    });
  };
  const { title, body, open } = modal;
  return (
    <Col md={12}>
      <Button
        variant="contained"
        className="btn-add"
        onClick={() => createAction('create')}
      >
        New topic
      </Button>
      <Row>
        {data &&
          data.map((e) => {
            const { name, star, id, flashCards } = e;
            return (
              <Col md={6} sm={12} className="fl-col">
                <Card className="fl-card fl-l">
                  <CardHeader
                    avatar={
                      <Avatar className={style.root} aria-label="recipe">
                        {flashCards.length}
                      </Avatar>
                    }
                    action={
                      <div>
                        <IconButton
                          aria-label="settings"
                          className={style.action}
                          onClick={() => createAction('update', e)}
                        >
                          <CreateIcon />
                        </IconButton>
                        <IconButton
                          color="link"
                          className={style.action}
                          aria-label="settings"
                          onClick={() => handleConfirmDeleteLesson(id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    }
                    title={
                      <Link
                        to={`/flashcard/${myclassId}/lesson/${id}/card`}
                        className="link"
                      >
                        <b>{name}</b>
                      </Link>
                    }
                    subheader={
                      <Rating
                        name="simple-controlled"
                        value={star}
                        onChange={(event, newValue) => {
                          hnadleUpdateStar(newValue, id);
                        }}
                      />
                    }
                  />
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
        <DialogTitle id="simple-dialog-title">Delete Lesson?</DialogTitle>
        <div className="m-r">
          <button className="btn-cancel" onClick={handleCloseDialog}>
            Cancel
          </button>
          <button className="btn-continue" onClick={deleteLesson}>
            Delete
          </button>
        </div>
      </Dialog>
      <BackdropEffect openBackdrop={backdrop} />
      <ModalAction
        open={open}
        body={body}
        title={title}
        close={closeModal}
      ></ModalAction>
    </Col>
  );
}

export default LessonFlashCard;
