import React from 'react';
import { Button, Col, Form, Input, Row, Label, FormGroup } from 'reactstrap';
import _set from 'lodash/set';
import './SingleTruffleAbi.css';
import TextField from '../ui/TextField';

export default class SingleTruffleAbi extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.callMethodOnTruffleContract = this.callMethodOnTruffleContract.bind(this);

        this.state = this.getInitialState(props.truffleContract, props.abi);
    }

    getInitialState(truffleContract, abi) {
        return {
            truffleContract: truffleContract,
            abi: abi,
            abiCallState: {
                //pre-fill the arrays so that react has the right link to the object on the component state
                inputs: new Array(abi.inputs.length).fill(''),
                outputs: new Array(abi.outputs.length).fill(''),
                transactionResult: undefined
            }
        };
    }

    getWeb3() {
        if (this.props.web3 !== undefined) {
            return this.props.web3;
        } else {
            console.log('No web3 found in window and trying load it. Check on availability first.');
            throw new Error('Could not load web3 from props');
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

    callMethodOnTruffleContract() {
        const cont = this.state.truffleContract;
        let contAt;

        cont.at(this.props.deployedAddress).then((inst) => {
            contAt = inst;
            if (this.state.abi.constant) {
                let args = this.state.abiCallState.inputs.map(it => { return it });
                return this.executeFunctionByName("call", contAt[this.state.abi.name], args);
            } else {
                let newState = this.cloneState();
                newState.abiCallState.transactionResult = "submitting transaction...";
                this.setState(newState);

                let args = this.state.abiCallState.inputs.map(it => { return it });
                args.push({
                    from: this.props.web3.eth.coinbase
                });
                return this.executeFunctionByName(this.state.abi.name, contAt, args);
            }
        }).then((ret) => {
            let newState = this.cloneState();
            if (["string", "number", "boolean"].indexOf(typeof ret) > -1) {
                newState.abiCallState.outputs[0] = ret;
            } else {
                newState.abiCallState.transactionResult = JSON.stringify(ret);
            }
            this.setState(newState);
        });
    }

    executeFunctionByName(functionName, context /*, args */) {
        const args = Array.prototype.slice.call(arguments, 2)[0];
        let namespaces = functionName.split(".");
        const func = namespaces.pop();
        for (let i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }
        return context[func].apply(context, args);
    }

    render() {

        let singleAbiInputs = this.state.abi.inputs.map((inOutAbiField, ix) => {
            const fieldName = 'abiCallState.inputs[' + ix + ']';
            return (
                <TextField
                    key={fieldName}
                    name={fieldName}
                    label={inOutAbiField.name + ' - ' + inOutAbiField.type}
                    value={this.state.abiCallState.inputs[ix]}
                    onChange={this.handleInputChange}
                />
            );
        });
        if (singleAbiInputs.length === 0) {
            singleAbiInputs.push(
                <p key="abiCallState.noInputs">no inputs for method</p>
            );
        };

        let singleAbiOutputs = this.state.abi.outputs.map((inOutAbiField, ix) => {
            const fieldName = 'abiCallState.outputs[' + ix + ']';
            return (
                <TextField
                    key={fieldName}
                    name={fieldName}
                    label={inOutAbiField.name + ' - ' + inOutAbiField.type}
                    value={this.state.abiCallState.outputs[ix]}
                    onChange={this.handleInputChange}
                    disabled
                />
            );
        });
        if (singleAbiOutputs.length === 0) {
            singleAbiOutputs.push(
                <p key="abiCallState.noOutputs">no outputs for method</p>
            );
        };

        let transactionResultRow;
        if (!this.state.abi.constant) {
            transactionResultRow = <Row>
                <Col>
                    <FormGroup>
                        <Label for="abiCallState.transactionResult"><strong>Transaction Result</strong></Label>
                        <Input
                            type="textarea"
                            name="abiCallState.transactionResult"
                            id="abiCallState.transactionResult"
                            rows="5"
                            value={this.state.abiCallState.transactionResult}
                        />
                    </FormGroup>

                </Col>
            </Row>
        }


        return (<Form className="abi-header">
            <h4>{this.state.abi.name}</h4>

            <TextField
                name="abi.constant"
                label="constant"
                value={this.state.abi.constant}
                disabled
            />

            <TextField
                name="abi.payable"
                label="payable"
                value={this.state.abi.payable}
                disabled
            />

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
            {transactionResultRow}
            <Row>
                <Col>
                    <br />
                    <Button
                        className="call-method-btn"
                        color="primary"
                        onClick={() => { this.callMethodOnTruffleContract() }}
                        block>
                        Call "{this.state.abi.name}" Method
                    </Button>

                </Col>

            </Row>
        </Form>);
    }
}