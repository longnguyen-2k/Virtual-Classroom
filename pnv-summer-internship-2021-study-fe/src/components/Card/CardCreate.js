import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from "reactstrap";
import "../../styles/components/_home.scss";
import CopyToClipboard from "react-copy-to-clipboard";
import { Link } from "react-router-dom";
import ModalEdit from "../Classroom/ModalEditClass";
import { DateTime } from "../DateTime";
function CardCreate(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const {
    classroom: { id, className, topic, backgroundImage, createdAt, code },
    handleDeleteClass,
  } = props;

  return (
    <div
      className="card text-white card-has-bg click-col"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div className="card-img-overlay d-flex flex-column">
        <div>
          <Dropdown
            className="menuCard"
            direction="left"
            isOpen={dropdownOpen}
            toggle={toggleDropdown}
          >
            <DropdownToggle className="button-menuCard">
              <i className="fas fa-ellipsis-v"></i>
            </DropdownToggle>
            <DropdownMenu>
              <CopyToClipboard text={code}>
                <DropdownItem>Copy code invite</DropdownItem>
              </CopyToClipboard>
            </DropdownMenu>
          </Dropdown>
        </div>
        <Link to={`/0/classroom/${id}/stream`}>
          <div className="card-body">
            <h4 className="card-title mt-0 ">{className}</h4>
            <h5 className="topic">{topic}</h5>
            <DateTime date={createdAt} />
          </div>
        </Link>
        <div className="card-action">
          <ModalEdit id={id} />
          <Button
            className="buttonAction"
            outline
            onClick={() => handleDeleteClass(id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CardCreate;
