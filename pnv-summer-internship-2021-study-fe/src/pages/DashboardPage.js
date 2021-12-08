import React, { Component } from "react";
import Page from "components/Page";
import CardCreate from "../components/Card/CardCreate";
import CardSearch from "../components/Card/CardSearch";
import CardJoin from "../components/Card/CardJoin";
import { Col, Row, Spinner } from "reactstrap";
import { getClass, deleteAPI, unsubAPI } from "../APIService/ServiceClass";
import swal from "sweetalert";
import { Typography } from "@material-ui/core";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ownerClass: [],
      joinClass: [],
    };
  }
  async componentDidMount() {
    const { own, join } = await getClass("classrooms");
    this.setState({
      ownerClass: own,
      joinClass: join,
    });
  }

  handleDeleteClass = (idCard) => {
    const ownerClass = this.state.ownerClass;
    const matchedClass = ownerClass.find((item) => item.id === idCard);
    swal({
      title: "Are you sure?",
      text: "The classroom will delete!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteAPI(`classrooms/${matchedClass.id}`);
        this.setState({
          ownerClass: ownerClass.filter((item) => item.id !== idCard),
        });
        swal("The classroom has been deleted!", {
          icon: "success",
        });
      }
    });
  };
  handleLeaveClass = (idCard) => {
    const joinClass = this.state.joinClass;
    const matchedClass = joinClass.find((item) => item.id === idCard);
    swal({
      title: "Are you sure?",
      text: "Leave the classroom!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((leave) => {
      if (leave) {
        unsubAPI(`classrooms/${matchedClass.id}/leaveClassroom`);
        this.setState({
          joinClass: joinClass.filter((item) => item.id !== idCard),
        });
        swal("You have left the classroom!", {
          icon: "success",
        });
      }
    });
  };

  render() {
    const { ownerClass, joinClass } = this.state;
    const { searchClass: searchList } = this.props;

    if (searchList.length)
      return (
        <Page
          className="classroom"
          title="CLASSROOM"
          breadcrumbs={[{ name: "", active: true }]}
        >
          <Typography variant="h4" component="h4" className="t-c">
            Results
          </Typography>
          <Row>
            {searchList.map((item, index) => (
              <Col key={index} lg={3} md={6} sm={6} xs={12}>
                <CardSearch classroom={item} />
              </Col>
            ))}
          </Row>
        </Page>
      );
    if (joinClass.length || ownerClass.length)
      return (
        <Page
          className="classroom"
          title="CLASSROOM"
          breadcrumbs={[{ name: "", active: true }]}
        >
          <Typography variant="h4" component="h4" className="t-c">
            Your Class
          </Typography>
          <Row>
            {ownerClass.map((item) => (
              <Col lg={3} md={6} sm={6} xs={12} key={item.id}>
                <CardCreate
                  classroom={item}
                  handleDeleteClass={this.handleDeleteClass}
                />
              </Col>
            ))}
          </Row>
          {joinClass.length && (
            <div>
              <Typography variant="h4" component="h4" className="t-c">
                Class Attended
              </Typography>
              <Row>
                {joinClass.map((item) => (
                  <Col lg={3} md={6} sm={6} xs={12} key={item.id}>
                    <CardJoin
                      classroom={item}
                      handleLeaveClass={this.handleLeaveClass}
                    />
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Page>
      );
    return (
      <div className="sprinner-load">
        <Spinner color={"success"} />
      </div>
    );
  }
}

export default HomePage;
