import { Form, FormGroup, FormText, Input, Label, Button } from "reactstrap";
import React, { useEffect, useState } from "react";
import CallApi from "../../APIService/CallApi";
import swal from "sweetalert";

function FormCreate(props) {
  const [valueForm, setValueForm] = useState({});
  const { classroomEdit, toggleStatus, toggleStatusEdit } = props;
  const MOCK_POSSIBLE =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz0123456789";

  useEffect(() => {
    if (classroomEdit) setValueForm(classroomEdit);
    else {
      let codeClass = "";
      for (var i = 0; i < 6; i++)
        codeClass += MOCK_POSSIBLE.charAt(
          Math.floor(Math.random() * MOCK_POSSIBLE.length)
        );
      setValueForm((values) => ({
        ...values,
        code: codeClass,
      }));
    }
  }, [classroomEdit]);

  function handleInputChange(event) {
    event.persist();
    setValueForm((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    try {
      if (classroomEdit) {
        const { className, topic, backgroundImage } = valueForm;
        const valueEdit = { className, topic, backgroundImage };
        await CallApi(`classrooms/${classroomEdit.id}`, "PUT", valueEdit);
        toggleStatusEdit();
      } else {
        await CallApi("classrooms", "POST", valueForm);
        toggleStatus();
      }
      swal("Good job!", "You succeeded!", "success").then((success) => {
        if (success) {
          window.location.reload();
        }
      });
    } catch (error) {
      swal("Execution failed!", "Try again!", "error");
    }
  }

  return (
    <div>
      <Form
        className="classForm"
        action=""
        method="POST"
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
      >
        <FormGroup>
          <Label for="Name">Class Name (Capture)</Label>
          <Input
            type="text"
            name="className"
            id="className"
            required
            defaultValue={valueForm.className}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="topic">Topic</Label>
          <Input
            type="text"
            name="topic"
            id="topic"
            required
            value={valueForm.topic}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="background">Background Image</Label>
          <Input
            type="text"
            name="backgroundImage"
            id="backgroundImage"
            required
            value={valueForm.backgroundImage}
            onChange={handleInputChange}
          />
          <FormText color="muted">Choose background image with link</FormText>
        </FormGroup>
        <Button type="submit" color="success">
          {classroomEdit ? "Edit" : "Create"}
        </Button>
      </Form>
    </div>
  );
}
export default FormCreate;
