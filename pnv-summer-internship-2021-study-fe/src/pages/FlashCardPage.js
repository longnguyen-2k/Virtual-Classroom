import React from 'react';
import Page from 'components/Page';
import ClassFlashCard from '../components/FlashCard/ClassFlashCard';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LessonFlashCard from '../components/FlashCard/LessonFlashCard';
import FlashCard from '../components/FlashCard/FlashCard';
function FlashCardPage() {
  return (
    <Page className="" title="" breadcrumbs={[{ name: '' }]}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/flashcard/">
            <ClassFlashCard />
          </Route>
          <Route
            exact
            path="/flashcard/:myclassId/lesson"
            children={<LessonFlashCard />}
          />
          z
          <Route
            exact
            path="/flashcard/:myclassId/lesson/:lesson/card"
            children={<FlashCard />}
          />
        </Switch>
      </BrowserRouter>
    </Page>
  );
}

export default FlashCardPage;
