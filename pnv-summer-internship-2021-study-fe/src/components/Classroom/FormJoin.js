import { Form, FormGroup, FormText, Input, Label, Button } from "reactstrap";
import React from "react";
import CallApi from "../../APIService/CallApi";
import { useState } from "react";
import swal from "sweetalert";

function FormJoin(props) {
  const [valueForm, setValueForm] = useState("");
  const { toggleStatus } = props;

  function handleInputChange(event) {
    event.persist();
    setValueForm(event.target.value);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    try {
      await CallApi(`classrooms/joinClassroom?code=${valueForm}`, "GET", null);
      toggleStatus();
      swal("Good job!", "Join succeeded!", "success").then((success) => {
        if (success) {
          window.location.reload();
        }
      });
    } catch (error) {
      swal("Execution failed!", "Classroom doesn't exist!", "error");
    }
  }

  return (
    <div>
      <Form
        className="classForm"
        action="postFormJoin"
        method="POST"
        onSubmit={handleFormSubmit}
        encType="multipart/form-data"
      >
        <FormGroup>
          <Label for="code">Code Class</Label>
          <Input
            type="text"
            name="code"
            id="code"
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormText>
          Ask your teacher for the class code and then enter it here.
        </FormText>
        <Button type="submit" color="success">
          Join Classroom
        </Button>
      </Form>
    </div>
  );
}
export default FormJoin;
