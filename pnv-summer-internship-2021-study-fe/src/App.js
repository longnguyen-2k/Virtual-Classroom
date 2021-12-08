import { MainLayout } from "components/Layout";
import PageSpinner from "components/PageSpinner";
import React, { useState } from "react";
import componentQueries from "react-component-queries";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./styles/reduction.scss";
const DashboardPage = React.lazy(() => import("pages/DashboardPage"));
const ClassRoomPage = React.lazy(() => import("pages/ClassRoom"));
const MaterialDetail = React.lazy(() => import("pages/MaterialDetail"));
const FlashCardPage = React.lazy(() => import("pages/FlashCardPage"));
const getBasename = () => {
  return `/${process.env.PUBLIC_URL.split("/").pop()}`;
};

function App() {
  const [searchClass, setSearchClass] = useState([]);
  return (
    <BrowserRouter basename={getBasename()}>
      <Switch>
        <Route path="/login">
          <LoginPage />
        </Route>
        <MainLayout setSearchClass={setSearchClass}>
          <React.Suspense fallback={<PageSpinner />}>
            <Route exact path="/" component={DashboardPage}>
              <DashboardPage searchClass={searchClass}></DashboardPage>
            </Route>
            <Route
              exact
              path="/:idClass/material/:id/detail"
              component={MaterialDetail}
            />
            <Route path="/:tab/classroom/:id/">
              <ClassRoomPage />
            </Route>
            <Route path="/flashcard">
              <FlashCardPage />
            </Route>
          </React.Suspense>
        </MainLayout>
      </Switch>
    </BrowserRouter>
  );
}

const query = ({ width }) => {
  if (width < 575) {
    return { breakpoint: "xs" };
  }

  if (576 < width && width < 767) {
    return { breakpoint: "sm" };
  }

  if (768 < width && width < 991) {
    return { breakpoint: "md" };
  }

  if (992 < width && width < 1199) {
    return { breakpoint: "lg" };
  }

  if (width > 1200) {
    return { breakpoint: "xl" };
  }

  return { breakpoint: "xs" };
};

export default componentQueries(query)(App);
