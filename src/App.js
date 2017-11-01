import React, { Component } from 'react';
import Header from './header/Header';
import AbiGen from './abi/AbiGen';
import logo from './logo.svg';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div>
                    <Header/>
                </div>
                <AbiGen/>
            </div>
        );
    }
}

export default App;
