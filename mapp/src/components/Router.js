import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from "react";
import Login from './Login/Login';
import Register from './Register/Register';
import App from './App/App';

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </Switch>
    </BrowserRouter>
);

export default Router;