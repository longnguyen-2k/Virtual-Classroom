import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Col from 'reactstrap/lib/Col';
import { Button } from 'reactstrap';
import Row from 'reactstrap/lib/Row';
import ModalAction from '../Modal';
import FormAction from '../Form';
import FlashCardService from '../../APIService/FlashCardService';
import BackdropEffect from '../Backdrop';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import CardFlashcard from '../Card/CardFlashcard';
import Container from 'reactstrap/lib/Container';
import { ACTIONS } from '../constants';

function FlashCard(props) {
  const [backdrop, setBackdrop] = useState(false);
  const [data, setData] = useState(null);
  const { myclassId, lesson } = useParams();
  const [idDelete, setIdDelete] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  let dataForm = {
    question: null,
    answer: null,
  };
  const [modal, setModal] = useState({
    title: '',
    open: false,
    body: '',
  });
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await FlashCardService.getFlashCard(myclassId, lesson);
    setData(response.data);
  };
  const handleSubmit = async (data) => {
    setBackdrop(true);
    await FlashCardService.addFlashCard(myclassId, lesson, data);
    success();
  };
  const success = () => {
    setBackdrop(false);
    closeModal();
    fetchData();
  };
  const handleConfirmDeleteFlashcard = (idFlashcard) => {
    handleOpenDialog();
    setIdDelete(idFlashcard);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleUpdate = async (data) => {
    const { id } = data;
    setBackdrop(true);
    await FlashCardService.updateFlashCard(myclassId, lesson, id, data);
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
          title: 'New flash card',
          open: true,
        });
        break;
      case ACTIONS.EDIT:
        const { id, question, answer } = data;
        dataForm = {
          id: id,
          question: question,
          answer: answer,
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
          title: 'Update card',
          open: true,
        });
        break;
      default:
        break;
    }
  };
  const deleteFlashCard = async () => {
    setBackdrop(true);
    setOpenDialog(false);
    await FlashCardService.deleteFlashCard(myclassId, lesson, idDelete);
    success();
  };
  const createFieldForm = (data) => {
    const { question, answer } = data;
    const structure = [
      {
        fill: 'question',
        type: 'textarea',
        value: question,
      },
      {
        fill: 'answer',
        type: 'textarea',
        value: answer,
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
    <Container>
      <Button
        variant="contained"
        className="btn-add"
        onClick={() => createAction('create')}
      >
        + New Flash Card
      </Button>
      <Col md={12}>
        <Row>
          {data &&
            data.map((e) => {
              return (
                <Col lg={3} md={6} sm={12}>
                  <CardFlashcard
                    createAction={createAction}
                    handleConfirmDeleteFlashcard={handleConfirmDeleteFlashcard}
                    data={e}
                  />
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
          <DialogTitle id="simple-dialog-title">Delete Flashcard?</DialogTitle>
          <div className="m-r">
            <button className="btn-cancel" onClick={handleCloseDialog}>
              Cancel
            </button>
            <button className="btn-continue" onClick={deleteFlashCard}>
              Delete
            </button>
          </div>
        </Dialog>
        <ModalAction
          open={open}
          body={body}
          title={title}
          close={closeModal}
        ></ModalAction>
        <BackdropEffect openBackdrop={backdrop} />
      </Col>
    </Container>
  );
}

export default FlashCard;
