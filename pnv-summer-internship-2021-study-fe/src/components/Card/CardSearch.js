import React from "react";
import { Button } from "reactstrap";
import "../../styles/components/_home.scss";
import { DateTime } from "../DateTime";
import CallApi from "../../APIService/CallApi";
import swal from "sweetalert";

function CardSearch(props) {
  const {
    classroom: {
      id,
      className,
      topic,
      backgroundImage,
      ownerName,
      ownerAvatar,
    },
  } = props;
  const requestJoinClass = async () => {
    try {
      await CallApi(`classrooms/${id}/request`, "GET", null);
      swal("Good job!", "Your request has been sent!", "success");
    } catch (error) {
      swal("Execution failed!", "Unable to send request!", "error");
    }
  };
  return (
    <div
      className="card text-white card-has-bg click-col"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div className="card-img-overlay d-flex flex-column">
        <div className="card-body">
          <h4 className="card-title mt-0 ">{className}</h4>
          <h5 className="topic">{topic}</h5>
        </div>
        <div className="card-footer">
          <div className="media">
            <img
              className="mr-3 rounded-circle"
              src={`${ownerAvatar}`}
              alt="avatar"
            />
            <div className="media-body">
              <h6 className="my-0 text-white d-block">{ownerName}</h6>
            </div>
          </div>
        </div>
        <div className="card-action">
          <Button
            className="buttonAction"
            outline
            onClick={() => requestJoinClass()}
          >
            Join classroom
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CardSearch;
