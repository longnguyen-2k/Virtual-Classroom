import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import FormCreate from "./FormCreate";
import FormJoin from "./FormJoin";
import "../../styles/components/_modal.scss";

function ModalClass() {
  const [chooseForm, setChooseForm] = useState(false);
  const [status, setStatus] = useState(false);
  const toggleStatus = () => {
    setStatus(!status);
  };
  const showJoinForm = () => {
    toggleStatus();
    setChooseForm(true);
  };
  const showCreateForm = () => {
    toggleStatus();
    setChooseForm(false);
  };

  return (
    <div>
      <div className="buttonGroup">
        <Button
          className="buttonClass"
          color="secondary"
          outline
          onClick={showCreateForm}
        >
          <i className="fas fa-plus"></i>
        </Button>

        <Button color="secondary" outline onClick={showJoinForm}>
        <i className="fas fa-users"></i>
        </Button>
      </div>
      <Modal isOpen={status} fade={false} toggle={toggleStatus}>
        <ModalHeader toggle={toggleStatus}>
          {chooseForm ? "Join Classroom" : "Create Classroom"}
        </ModalHeader>
        <ModalBody>
          {chooseForm ? (
            <FormJoin toggleStatus={toggleStatus} />
          ) : (
            <FormCreate toggleStatus={toggleStatus} />
          )}
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalClass;
