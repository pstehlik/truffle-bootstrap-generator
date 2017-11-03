import React from 'react';
import { Col, Container, Input, Row, Label, FormGroup } from 'reactstrap';
import Web3 from 'web3';
import _set from 'lodash/set';
import _cloneDeep from 'lodash/cloneDeep';
import SingleTruffleAbi from './SingleTruffleAbi';
import TextField from '../ui/TextField';
import contract from 'truffle-contract';
import './AbiGen.css';


export default class AbiGen extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.callMethodOnTruffleContract = this.callMethodOnTruffleContract.bind(this);
        this.state = {
            truffleContract: undefined,
            displayContract: undefined,
            deployedAddress: undefined,
            // deployedAddress: '0xf57edc70efc620546772bd8bdc421a55293f7f04',
            web3: undefined
        };
        if (props.contractJson !== undefined) {
            this.loadContractAndStoreOnState(props.contractJson, this.state);
        }
    }


    componentWillReceiveProps(nextProps) {
        if (this.props.contractJson !== nextProps.contractJson) {
            this.resetState(nextProps);
        }
    }

    componentDidMount() {
        const { web3 } = window;
        const newState = this.cloneState();

        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        if (typeof web3 !== 'undefined') {
            // Use Mist/MetaMask's provider
            window.web3 = new Web3(web3.currentProvider);
        } else {
            console.log('No web3? You should consider trying MetaMask!')
            // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
            window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        }

        newState.web3 = web3;
        //do the manual checks for shallow rendering during testing
        if (web3 !== undefined && newState.truffleContract !== undefined) {
            newState.truffleContract.setProvider(web3.currentProvider);
        }

        this.setState(newState);
    }

    loadContractAndStoreOnState(contractJson, state) {
        const cont = this.loadAbi(contractJson);
        //only do all the loading and display handling if the contract is a 'valid'
        //contract. Validity here being determined by looking at the loaded 'abi' 
        //as an indicator.
        if (cont.abi !== undefined) {
            state.truffleContract = cont;
            state.displayContract = this.genContractForState(cont);
            //do the manual checks for shallow rendering during testing
            if (state.web3 !== undefined) {
                state.truffleContract.setProvider(state.web3.currentProvider);
            }
            if (this.props.onValidAbi !== undefined) {
                this.props.onValidAbi();
            }
        } else {
            if (this.props.onInvalidAbi !== undefined) {
                this.props.onInvalidAbi();
            }
        }
    }

    resetState(useTheseProps) {
        let newState = this.cloneState();
        this.loadContractAndStoreOnState(useTheseProps.contractJson, newState);
        this.setState(newState);
    }

    getWeb3() {
        if (this.state.web3 !== undefined) {
            return this.state.web3;
        } else {
            console.log('No web3 found in window and trying load it. Check on availability first.');
            throw new Error('Could not load web3 from window');
        }
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
        this.setState(newState);
    }

    loadAbi = (contractJson) => {
        return contract(contractJson);
    }

    callMethodOnTruffleContract() {
        const cont = this.state.truffleContract;
        let contAt;
        cont.at(this.state.deployedAddress).then((inst) => {
            contAt = inst;
            return contAt.owner.call();
        }).then((ret) => {
            console.log(ret)
        });
    }

    genContractForState(truffleContract) {
        if (truffleContract === undefined || truffleContract.abi === undefined) {
            return;
        }
        //calling _cloneDeep here will lead to error as it runs into web3 errors
        let contractForState = JSON.parse(JSON.stringify(truffleContract));
        contractForState.bytecode = "not cloned";
        contractForState.abi = this.addValueKeyForAbiElements(contractForState.abi);
        return contractForState;
    }

    addValueKeyForAbiElements(abiForState) {
        let ret = _cloneDeep(abiForState);

        for (const singleAbiElement of ret) {
            const addValueField = (obj) => { obj.value = undefined };
            // default back to an empty array for the input/output as the cloning through JSON.parse doesn't set the arrays right
            singleAbiElement.inputs = (singleAbiElement.inputs instanceof Array) ? singleAbiElement.inputs : [];
            singleAbiElement.outputs = (singleAbiElement.outputs instanceof Array) ? singleAbiElement.outputs : [];

            for (const singleInput of singleAbiElement.inputs) {
                addValueField(singleInput);
            }
            for (const singleOutput of singleAbiElement.outputs) {
                addValueField(singleOutput);
            }
        }
        return ret;
    }


    renderNetworkDropdown(displayContract) {
        let selectOptions = [];
        for (const singleNetwork in displayContract.networks) {
            selectOptions.push(
                <option key={singleNetwork}>
                    {singleNetwork}
                </option>
            )
        }
        return (
            <FormGroup>
                <Label for="displayContract.networks">displayContract.networks</Label>
                <Input type="select" name="displayContract.networks" id="displayContract.networks">
                    {selectOptions}
                </Input>
            </FormGroup>
        );
    }

    renderContract(displayContract) {
        if (displayContract === undefined) {
            return;
        }
        const disabledMainFields = ['contractName', 'schemaVersion', 'updatedAt'];
        const disabledMainFieldsHtml = disabledMainFields.filter(fieldKey => {
            // adding string check due to $$ variable being injected by react
            return typeof fieldKey === 'string';
        }).map((fieldKey) => {
            return <TextField
                key={fieldKey}
                name={fieldKey}
                label={fieldKey}
                value={this.state.displayContract[fieldKey]}
                disabled
            />
        });

        return (
            <FormGroup>
                {this.renderNetworkDropdown(this.state.displayContract)}
                {disabledMainFieldsHtml}
                {this.renderContractAbiFields(this.state.displayContract)}
            </FormGroup>
        );
    }

    renderContractAbiFields(displayContract) {
        const singleAbiInteraction = displayContract.abi.filter((singleAbi => {
            return singleAbi.type === 'function'
        })).map((singleAbi, ix) => {
            return <SingleTruffleAbi key={singleAbi.name}
                truffleContract={this.state.truffleContract}
                abi={singleAbi}
                deployedAddress={this.state.deployedAddress}
                web3={this.state.web3}
            />
        });

        return (
            <Container>
                <Row className="abi-interactions-header">
                    <Col>
                        <h2>Possible Contract Interactions</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        {singleAbiInteraction}
                    </Col>
                </Row>
            </Container>
        );
    }



    render() {
        let contract = this.renderContract(this.state.displayContract);

        if (this.state.displayContract !== undefined) {
            return (
                <div>
                    <Row>
                        <Col><h3>Contract Overview</h3></Col>
                    </Row>
                    <Row>
                        <Col>
                            <TextField
                                name="deployedAddress"
                                label="deployedAddress"
                                value={this.state.deployedAddress}
                                onChange={this.handleInputChange}
                            />
                        </Col>
                    </Row>

                    {contract}
                </div>
            );
        } else {
            return(<div>Paste your valid <a href="https://github.com/trufflesuite/truffle-contract" target="_blank">Truffle Contract</a> ABI JSON output in the box above.</div>);
        }

    }
}