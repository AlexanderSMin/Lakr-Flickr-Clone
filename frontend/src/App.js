import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import ViewPhotos from "./components/ViewPhotos"
import PhotosMain from "./components/PhotosMain";
import HomePage from "./components/HomePage";
import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <>
        <Switch>
          <Route
            path="/photos"exact
          >
            <ViewPhotos />
          </Route>
          <Route path="/photos/:photoId">
            <PhotosMain/>
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
        </>
        )}
        <Footer />
    </>
  );
}

export default App;
