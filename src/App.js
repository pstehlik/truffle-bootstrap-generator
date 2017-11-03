import React, { Component } from 'react';
import Header from './header/Header';
import AbiGen from './abi/AbiGen';
import _set from 'lodash/set';

import { Container } from 'reactstrap';
import JsonPasteBox from './ui/JsonPasteBox';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showContractText: true,
            contractJson: undefined,
            parsedContractJson: undefined,
            jsonParseStatus: {
                status: undefined,
                text: undefined
            }
        };

        this.handleInvlidAbi = this.handleInvlidAbi.bind(this);
        this.handleValidAbi = this.handleValidAbi.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    cloneState() {
        return Object.assign({}, this.state);
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        let newState = this.cloneState();
        _set(newState, name, value);

        if (newState.contractJson !== this.state.contractJson) {
            try {
                newState.parsedContractJson = this.parseJsonInput(newState.contractJson);
            } catch (error) {
                this.handleInvlidAbi();
            }
        }
        this.setState(newState);
    }

    handleInvlidAbi() {
        const newState = this.cloneState();
        newState.jsonParseStatus.status = 'danger';
        newState.jsonParseStatus.text = 'JSON does not contain a valid Truffle Contract';
        this.setState(newState);
    }

    handleValidAbi() {
        const newState = this.cloneState();
        newState.jsonParseStatus.status = undefined;
        newState.jsonParseStatus.text = undefined;
        this.setState(newState);
    }

    parseJsonInput(contractJson) {
        return JSON.parse(contractJson);
    }

    render() {
        return (
            <div className="App">
                <div>
                    <Header />
                </div>
                <Container className="Abi-Header">
                    <JsonPasteBox
                        name="contractJson"
                        parseStatusText={this.state.jsonParseStatus.text}
                        parseStatus={this.state.jsonParseStatus.status}
                        value={this.state.contractJson}
                        onChange={this.handleInputChange}
                    />
                    <AbiGen
                        contractJson={this.state.parsedContractJson}
                        onInvalidAbi={this.handleInvlidAbi}
                        onValidAbi={this.handleValidAbi}
                    />
                </Container>

            </div>
        );
    }
}

export default App;
