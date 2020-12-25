import './App.css';
import React from 'react';
import HomePage from "./src/pages/HomePage/HomePage";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AuthPage from "./src/pages/AuthPage/AuthPage";
import DownloadPage from "./src/pages/DownloadPage/DownloadPage";
import DashboardPage from "./src/pages/DashboardPage/DashboardPage";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShortLinkPage from "./src/pages/ShortLinkPage/ShortLinkPage";

function App(props) {
    return (
        <div className="App">
            <BrowserRouter>
                <Switch>
                    <Route path="/" render={(props) => <HomePage {...props} />} exact/>
                    <Route path="/auth" component={AuthPage} exact/>
                    <Route path="/download/:id" component={DownloadPage} exact/>
                    <Route path="/myPanel" component={DashboardPage} exact/>
                    <Route path="/:shortLink" render={props => <ShortLinkPage {...props} />} exact/>
                </Switch>
            </BrowserRouter>
            <ToastContainer position={"top-center"}/>
        </div>
    );
}

export default App;
