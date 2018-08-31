import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from "react";
import Login from './Login/Login';
import Register from './Register/Register';
import App from './App/App';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/mplaces" component={App} />
        </Switch>
    </BrowserRouter>
);

export default Router;