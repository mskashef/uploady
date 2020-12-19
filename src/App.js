import './App.css';
import React from 'react';
import HomePage from "./src/pages/HomePage/HomePage";
import {BrowserRouter, Route} from "react-router-dom";
import AuthPage from "./src/pages/AuthPage/AuthPage";
import DownloadPage from "./src/pages/DownloadPage/DownloadPage";
import DashboardPage from "./src/pages/DashboardPage/DashboardPage";
import Cookies from 'js-cookie';
function App(props) {
    
    return (
        <div className="App">
            <BrowserRouter>
                <Route path="/" render={(props) => <HomePage {...props} />} exact />
                <Route path="/auth" component={AuthPage} exact />
                <Route path="/download/:id" component={DownloadPage} exact />
                <Route path="/myPanel" component={DashboardPage} exact />
            </BrowserRouter>
        </div>
    );
}

export default App;
