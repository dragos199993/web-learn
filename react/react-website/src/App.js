import React, { Component } from 'react';
import Header from './components/header/Header';
import Homepage from './components/pages/Homepage';
import Productspage from './components/pages/Productspage';
import Footer from './components/footer/Footer';
import './assets/css/main.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Contactpage from './components/pages/Contactpage';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Header />
                        <Route exact path="/" component={Homepage} />
                        <Route exact path="/products" component={Productspage} />
                        <Route exact path="/contact" component={Contactpage} />
                    <Footer />
                </div>
            </Router>
        );
    }
}

export default App;