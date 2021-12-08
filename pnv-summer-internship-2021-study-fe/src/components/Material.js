import React, { useState, useEffect } from 'react';
import FormAction from './Form';
import { Button } from 'reactstrap';
import ModalAction from './Modal';
import MaterialService from '../APIService/MaterialService';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import CardMaterial from './Card/CardMaterial';
import { ACTIONS } from './constants';
const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));
export default function Material(props) {
  const classes = useStyles();
  const [data, setData] = useState(null);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  let dataForm = {
    title: null,
    content: null,
    file: null,
  };
  const [modal, setModal] = useState({
    title: null,
    body: null,
    open: false,
  });
  async function fetchData() {
    const response = await MaterialService.getMaterial(idClass);
    setData(response.data);
  }
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
  const createAction = (action, id, data) => {
    switch (action) {
      case ACTIONS.CREATE:
        setModal({
          body: (
            <FormAction
              structure={createFieldForm(dataForm)}
              titleSubmit="Post"
              dataForm={dataForm}
              submit={handleSubmit}
            ></FormAction>
          ),
          title: 'Post material',
          open: true,
        });
        break;
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
          title: 'Update material',
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
        fill: 'title',
        type: 'text',
        value: title,
      },
      {
        fill: 'content',
        type: 'textarea',
        value: content,
      },
      {
        fill: 'fileAttachment',
        type: 'file',
        value: fileAttachment,
      },
    ];
    return structure;
  };
  const handleSubmit = async (data) => {
    handleOpenBackdrop();
    const response = await MaterialService.postMaterial(idClass, data);
    fetchData();
    if (response.statusText == 'OK') {
      handleCloseModal();
      handleCloseBackdrop();
    }
  };
  const handleUpdate = async (data) => {
    handleOpenBackdrop();
    const response = await MaterialService.putMaterial(idClass, data.id, data);
    fetchData();
    if (response.statusText == 'OK') {
      handleCloseModal();
      handleCloseBackdrop();
    }
  };
  const handleDeleteMaterial = (idMaterial) => {
    setOpenBackdrop(true);
    MaterialService.deleteMaterial(idClass, idMaterial);
    fetchData();
    handleCloseBackdrop();
  };
  const { idClass } = useParams();
  const { open, body, title } = modal;
  return (
    <div className="contain">
      <Button className="p-m-n" onClick={() => createAction('create')}>
        <span className="p-sp-m">+</span>Post material
      </Button>
      <br />
      <br />
      {data &&
        data.map((e) => {
          return (
            <CardMaterial
              delete={handleDeleteMaterial}
              update={createAction}
              idClass={idClass}
              data={e}
            />
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
    </div>
  );
}
