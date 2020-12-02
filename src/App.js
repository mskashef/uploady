import './App.css';
import React from 'react';
import HomePage from "./src/pages/HomePage/HomePage";
import {BrowserRouter, Route} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Route path="/" component={HomePage} />
            </BrowserRouter>
        </div>
    );
}

export default App;
