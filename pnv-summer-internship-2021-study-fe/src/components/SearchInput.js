import React, { useState } from "react";
import { Form, Input, Button } from "reactstrap";
import CallApi from "../APIService/CallApi";
import swal from "sweetalert";

const SearchInput = (props) => {
  const [valueSearch, setValueSearch] = useState();
  const { setSearchClass } = props;

  function handleInputChange(event) {
    event.persist();
    setValueSearch(event.target.value);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    try {
      const res = await CallApi(
        `classrooms?search=${encodeURIComponent(valueSearch)}`,
        "GET",
        null
      );
      if (res.data) {
        setSearchClass(res.data);
      }
    } catch (error) {
      swal("Search failed!", "Try again!", "error");
    }
  }

  return (
    <Form
      inline
      className="cr-search-form"
      method="GET"
      onSubmit={handleFormSubmit}
    >
      <Button
        className="cr-search-form__button"
        color="secondary"
        outline
        type="submit"
      >
        <i className="fas fa-search"></i>
      </Button>
      <Input
        type="search"
        className="cr-search-form__input"
        placeholder="Search..."
        onChange={handleInputChange}
      />
    </Form>
  );
};

export default SearchInput;
