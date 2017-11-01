import React from 'react';
import { Button, Col, Container, Form, FormText, Input, InputGroup, Row, Label, FormGroup } from 'reactstrap';

import idx from 'idx';
import _set from 'lodash/set';
import _cloneDeep from 'lodash/cloneDeep';

import contract from 'truffle-contract';

export default class AbiGen extends React.Component {
    constructor(props) {
        super(props);

        const cont = this.loadAbi();
        this.state = {
            truffleContract: cont,
            displayContract: {}
        };
        this.handleInputChange = this.handleInputChange.bind(this);


        this.state.displayContract = this.genContractForState(this.state.truffleContract);
    }

    getWeb3() {
        const { web3 } = window;
        if (!web3) {
            console.log('No web3 found in window');
            throw new Error('Could not load web3 from window');
        }
        return web3;
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

    loadAbi = () => {
        const jsonAbi = this.getAbiJson();
        const cont = contract(jsonAbi);
        return cont;
    }

    reloadAbi = () => {
        const s = this.cloneState();
        const cont = this.loadAbi();
        s.truffleContract = cont;
        this.setState(s);
    }

    genContractForState(truffleContract) {
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

    renderDisabledField(props) {
        return (
            <FormGroup>
                <Label for={props.stateKey}>{props.stateKey}</Label>
                <Input name={props.stateKey} value={props.stateField} disabled />
            </FormGroup>
        )
    }

    renderNetworkDropdown(displayContract) {
        let selectOptions = [];
        for (const singleNetwork in displayContract.networks) {
            selectOptions.push(
                <option>
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
        const disabledMainFields = ['contractName', 'schemaVersion', 'updatedAt'];
        const disabledMainFieldsHtml = disabledMainFields.map((fieldKey) => {
            if (typeof fieldKey === 'string') {  // adding string check due to $$
                return this.renderDisabledField(
                    {
                        stateKey: "displayContract." + fieldKey,
                        stateField: this.state.displayContract[fieldKey]
                    }
                )
            }
        });

        return (
            <Form>
                {this.renderNetworkDropdown(this.state.displayContract)}
                {disabledMainFieldsHtml}
                {this.renderContractAbiFields(this.state.displayContract)}
            </Form>
        );
    }



    renderSingleContractAbiFields(singleAbi, ix) {
        let singleAbiInputs = singleAbi.inputs.map((inOutAbiField) => {
            return (
                <FormGroup>
                    <Label for="asdf">{inOutAbiField.name} - {inOutAbiField.type}</Label>
                    <Input type="text" name="asdf" id="asdfg" placeholder={inOutAbiField.type} />
                </FormGroup>
            );
        });

        let singleAbiOutputs = singleAbi.outputs.map((inOutAbiField) => {
            return (
                <FormGroup>
                    <Label for="asdf">{inOutAbiField.name} - {inOutAbiField.type}</Label>
                    <Input type="text" name="asdf" id="asdfg" placeholder={inOutAbiField.type} />
                </FormGroup>
            );
        });


        return (<Form>
            <h4>{singleAbi.name}</h4>
            {
                this.renderDisabledField(
                    {
                        stateKey: "displayContract.abi[" + ix + "].constant",
                        stateField: singleAbi.constant
                    }
                )
            }
            {
                this.renderDisabledField(
                    {
                        stateKey: "displayContract.abi[" + ix + "].payable",
                        stateField: singleAbi.payable
                    }
                )
            }
            <Row>
                <Col>
                    <strong>inputs</strong>
                    {singleAbiInputs}
                </Col>

            </Row>
            <Row>
                <Col>
                    <strong>outputs</strong>
                    {singleAbiOutputs}
                </Col>

            </Row>
            <Row>
                <Col>
                    <br />
                    <Button
                        color="primary"

                        block>
                        Call {singleAbi.name}
                    </Button>

                </Col>

            </Row>
        </Form>);
    }

    renderContractAbiFields(displayContract) {
        const singleAbiInteraction = displayContract.abi.map((singleAbi, ix) => {
            if (singleAbi.type === 'function') {
                return this.renderSingleContractAbiFields(singleAbi, ix);
            }
        });

        return (
            <Container>
                <Row>
                    <Col>
                        <h2>ABI Interactions</h2>
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
        const tId = this.state.transactionId ? 'https://rinkeby.etherscan.io/tx/' + this.state.transactionId : '';

        let contract = this.renderContract(this.state.displayContract);

        return (
            <Container>

                {contract}
                <Row>
                    <Col>
                        <br />
                        <Button
                            color="secondary"

                            block
                            onClick={this.reloadAbi}>
                            Reload Abi
                        </Button>

                    </Col>

                </Row>
            </Container>
        );
    }

    getAbiJson() {
        return JSON.parse('{ "contract_name": "Entity", "abi": [ { "constant": false, "inputs": [ { "name": "_offChainLocation", "type": "string" } ], "name": "setOffChainLocation", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "_verifier", "type": "address" } ], "name": "wasVerifiedBy", "outputs": [ { "name": "wasVerified", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "getOffChainLocation", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "getRootHash", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "verifiedBy", "outputs": [ { "name": "", "type": "bool" } ], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [ { "name": "", "type": "address" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [ { "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "offChainLocation", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "verify", "outputs": [], "payable": false, "type": "function" }, { "inputs": [ { "name": "_rootHash", "type": "string" }, { "name": "_offChainLocation", "type": "string" } ], "payable": false, "type": "constructor" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" } ], "unlinked_binary": "0x6060604052341561000f57600080fd5b6040516108b23803806108b28339810160405280805182019190602001805190910190505b805b5b825b600081805161004c929160200190610089565b505b5060028054600160a060020a03191633600160a060020a03161790555b600381805161007e929160200190610089565b505b505b5050610129565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100ca57805160ff19168380011785556100f7565b828001600101855582156100f7579182015b828111156100f75782518255916020019190600101906100dc565b5b50610104929150610108565b5090565b61012691905b80821115610104576000815560010161010e565b5090565b90565b61077a806101386000396000f300606060405236156100965763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166306315413811461009b57806349696f99146100ee5780635c4843d71461012157806380759f1f146101ac57806383bfcf1f146102375780638da5cb5b1461026a578063f2fde38b14610299578063f49081fa146102ba578063fc735e9914610345575b600080fd5b34156100a657600080fd5b6100ec60046024813581810190830135806020601f8201819004810201604051908101604052818152929190602084018383808284375094965061035a95505050505050565b005b34156100f957600080fd5b61010d600160a060020a036004351661038e565b604051901515815260200160405180910390f35b341561012c57600080fd5b6101346103c6565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156101715780820151818401525b602001610158565b50505050905090810190601f16801561019e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b34156101b757600080fd5b61013461046f565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156101715780820151818401525b602001610158565b50505050905090810190601f16801561019e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561024257600080fd5b61010d600160a060020a0360043516610518565b604051901515815260200160405180910390f35b341561027557600080fd5b61027d61052d565b604051600160a060020a03909116815260200160405180910390f35b34156102a457600080fd5b6100ec600160a060020a036004351661053c565b005b34156102c557600080fd5b6101346105d5565b60405160208082528190810183818151815260200191508051906020019080838360005b838110156101715780820151818401525b602001610158565b50505050905090810190601f16801561019e5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561035057600080fd5b6100ec610673565b005b60025433600160a060020a0390811691161461037557600080fd5b600381805161038892916020019061069c565b505b5b50565b600160a060020a038116600090815260016020819052604082205460ff16151514156103bc575060016103c0565b5060005b5b919050565b6103ce61071b565b60038054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104645780601f1061043957610100808354040283529160200191610464565b820191906000526020600020905b81548152906001019060200180831161044757829003601f168201915b505050505090505b90565b61047761071b565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104645780601f1061043957610100808354040283529160200191610464565b820191906000526020600020905b81548152906001019060200180831161044757829003601f168201915b505050505090505b90565b60016020526000908152604090205460ff1681565b600254600160a060020a031681565b60025433600160a060020a0390811691161461055757600080fd5b600160a060020a038116151561056c57600080fd5b600254600160a060020a0380831691167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a36002805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a0383161790555b5b50565b60038054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561066b5780601f106106405761010080835404028352916020019161066b565b820191906000526020600020905b81548152906001019060200180831161064e57829003601f168201915b505050505081565b600160a060020a0333166000908152600160208190526040909120805460ff191690911790555b565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106106dd57805160ff191683800117855561070a565b8280016001018555821561070a579182015b8281111561070a5782518255916020019190600101906106ef565b5b5061071792915061072d565b5090565b60206040519081016040526000815290565b61046c91905b808211156107175760008155600101610733565b5090565b905600a165627a7a72305820b99e69408c437a8adff59b1b32307268e6e13ca6840f31703a8e78f1db58c1ba0029", "networks": { "4": { "events": { "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0": { "anonymous": false, "inputs": [ { "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" } }, "links": {}, "address": "0x99c78eb5d386ec7faeca9b3f8eb03bbccdc160fa", "updated_at": 1508799654698 }, "1508776411310": { "events": { "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0": { "anonymous": false, "inputs": [ { "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" } }, "links": {}, "address": "0xbd61f20b89d20c892c4e7efd3fcf50305b733eda", "updated_at": 1508777002215 }, "1508777042262": { "events": { "0x8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0": { "anonymous": false, "inputs": [ { "indexed": true, "name": "previousOwner", "type": "address" }, { "indexed": true, "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" } }, "links": {}, "address": "0x919cd607c6464aa58b8710f261638c7113d0bc20", "updated_at": 1508777057099 } }, "schema_version": "0.0.5", "updated_at": 1508889906378 }');
    }
}