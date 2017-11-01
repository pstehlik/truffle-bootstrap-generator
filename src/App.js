import React, { Component } from 'react';
import Header from './header/Header';
import AbiGen from './abi/AbiGen';
import './App.css';

class App extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selectedContract: ''
        };

        this.onChangeContract = this.onChangeContract.bind(this);
    }

    cloneState() {
        return Object.assign({}, this.state);
    }

    onChangeContract(event){
        
        const newState = this.cloneState();
        newState.selectedContract = event.target.value;
        this.setState(newState);
    }

    render() {
        return (
            <div className="App">
                <div>
                    <Header onSelectContract={this.onChangeContract}/>
                </div>
                <AbiGen selectedContract={this.state.selectedContract}/>
            </div>
        );
    }
}

export default App;
