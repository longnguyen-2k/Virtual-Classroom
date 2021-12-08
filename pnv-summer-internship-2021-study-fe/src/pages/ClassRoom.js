import Page from "components/Page";
import React, { useEffect, useState } from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Route, Switch, useHistory, useParams } from "react-router-dom";
import Col from "reactstrap/lib/Col";
import Row from "reactstrap/lib/Row";
import { getClassDetail } from "../APIService/ServiceClass";
import CardClassRoom from "../components/Card/CardClassRoom";
import Container from "reactstrap/lib/Container";
import { withStyles } from "@material-ui/core";
import Stream from "../components/Stream";
import Member from "../components/Member";
import ClassroomContext from "../components/ClassroomContext";
const Material = React.lazy(() => import("../components/Material"));
const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);
const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      marginLeft: -3,
      height: "1rem",
      borderRadius: "20rem",
      width: "100%",
      backgroundColor: "#3f51b5",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);
function ClassRoom(props) {
  const [value, setValue] = useState(0);
  const [data, setData] = useState({});
  const history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const fetchData = async () => {
    const response = await getClassDetail(id);
    setData(response);
  };
  useEffect(() => {
    setValue(parseInt(tab));
    fetchData();
  }, []);
  const { id, tab } = useParams();
  const handleRoute = (url) => {
    history.push(url);
  };
  return (
    <Page>
      <Container>
        {data && <CardClassRoom data={data} />}
        <Row className="cl-row">
          <Col md="9" className="center">
            <StyledTabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              aria-label="disabled tabs example"
            >
              <StyledTab
                className="tab"
                onClick={() => handleRoute(`/0/classroom/${id}/stream`)}
                label={<b className="text-tab">Stream</b>}
              />
              <StyledTab
                className="tab"
                onClick={() => handleRoute(`/1/classroom/${id}/material`)}
                label={<b className="text-tab">Material</b>}
              />
              <StyledTab
                className="tab"
                onClick={() => handleRoute(`/2/classroom/${id}/member`)}
                label={<b className="text-tab">Member</b>}
              />
            </StyledTabs>
          </Col>
        </Row>
        <hr className="cl-hr" />

        <Switch>
          <Route exact path="/0/classroom/:idClass/stream" component={Stream} />
          <Route
            exact
            path="/1/classroom/:idClass/material"
            component={Material}
          />
          {data && (
            <ClassroomContext.Provider value={data}>
              <Route
                exact
                path="/2/classroom/:idClass/member"
                component={Member}
              />
            </ClassroomContext.Provider>
          )}
        </Switch>
      </Container>
    </Page>
  );
}
export default ClassRoom;
