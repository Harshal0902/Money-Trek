import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Header from "./components/Header/Header"
import Chatbot from "./components/Chatbot/Chatbot"
import Home from "./pages/Home/Home"
import MoneySplit from "./pages/MoneySplit/MoneySplit"
import Trips from "./pages/Trips/Trips"
import Fade from 'react-reveal/Fade';

function Main() {

    return (
        <Router>
            <Fade top>
                <Header />
            </Fade>
            <Chatbot />
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/split' exact component={MoneySplit} />
                <Route path='/trips' exact component={Trips} />
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default Main;