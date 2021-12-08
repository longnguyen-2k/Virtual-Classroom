import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import FormCreate from "./FormCreate";
import CallApi from "../../APIService/CallApi";
import "../../styles/components/_modal.scss";

function ModalEditClass(props) {
  const [statusEdit, setStatusEdit] = useState(false);
  const [classroomEdit, setClassroom] = useState({});
  const toggleStatusEdit = () => {
    setStatusEdit(!statusEdit);
  };
  const { id } = props;

  const handleClassEdit = async () => {
    toggleStatusEdit();
    const responsive = await CallApi(`classrooms/${id}`, "GET", null);
    setClassroom(responsive.data);
  };
  return (
    <div>
      <div className="button-class">
        <Button
          className="buttonAction"
          outline
          onClick={() => handleClassEdit()}
        >
          Edit
        </Button>
      </div>
      <Modal isOpen={statusEdit}>
        <ModalHeader toggle={toggleStatusEdit}>Edit Classroom</ModalHeader>
        <ModalBody>
          <FormCreate
            toggleStatusEdit={toggleStatusEdit}
            classroomEdit={classroomEdit}
          />
        </ModalBody>
      </Modal>
    </div>
  );
}

export default ModalEditClass;
