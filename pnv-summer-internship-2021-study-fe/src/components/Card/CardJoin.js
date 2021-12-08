import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import "../../styles/components/_home.scss";
import { Link } from "react-router-dom";
import { DateTime } from "../DateTime";
function CardJoin(props) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);
  const {
    classroom: {
      id,
      className,
      topic,
      backgroundImage,
      createdAt,
      ownerName,
      ownerAvatar,
    },
    handleLeaveClass,
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
              <DropdownItem onClick={() => handleLeaveClass(id)}>
                Leave classroom
              </DropdownItem>
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
        <div className="card-footer">
          <div className="media">
            <img
              className="mr-3 rounded-circle"
              src={`${ownerAvatar}`}
              alt="avatar"
            />
            <div className="media-body">
              <h6 className="my-0 text-white d-block">{ownerName}</h6>
              <small>Teacher</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardJoin;
