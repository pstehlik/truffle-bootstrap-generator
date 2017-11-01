import React from 'react';
import { Button, Col, Form, Input, Row, Label, FormGroup } from 'reactstrap';
import _set from 'lodash/set';
import _get from 'lodash/get';

export default class SingleTruffleAbi extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.callMethodOnTruffleContract = this.callMethodOnTruffleContract.bind(this);

        this.state = {
            truffleContract: props.truffleContract,
            abi: props.abi,
            abiCallState: undefined
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
            return contAt.owner.call();
        }).then((ret) => {
            // this.state.abiCallState
            console.log(ret)
        });
    }

    renderEnabledField(props) {

        return (
            <FormGroup>
                <Label for={props.stateKey}>{props.stateKey}</Label>
                <Input name={props.stateKey} value={props.stateField} onChange={props.onChange} />
            </FormGroup>
        )
    }

    renderDisabledField(props) {
        return (
            <FormGroup>
                <Label for={props.stateKey}>{props.stateKey}</Label>
                <Input name={props.stateKey} value={props.stateField} disabled />
            </FormGroup>
        )
    }


    render() {
        let singleAbiInputs = this.state.abi.inputs.map((inOutAbiField, ix) => {
            const fieldName = 'abiCallState.inputs[' + ix + ']' + inOutAbiField.name;
            return (
                <FormGroup key={fieldName}>
                    <Label for={fieldName}>{inOutAbiField.name} - {inOutAbiField.type}</Label>
                    <Input
                        type="text"
                        name={fieldName}
                        placeholder={inOutAbiField.type}
                        value={_get(this.state, fieldName)}
                        onChange={this.handleInputChange}
                    />
                </FormGroup>
            );
        });

        let singleAbiOutputs = this.state.abi.outputs.map((inOutAbiField, ix) => {
            const fieldName = 'abiCallState.outputs[' + ix + ']' + inOutAbiField.name;
            return (
                <FormGroup key={fieldName}>
                    <Label for={fieldName}>{inOutAbiField.name} - {inOutAbiField.type}</Label>
                    <Input
                        type="text"
                        name={fieldName}
                        placeholder={inOutAbiField.type}
                        value={_get(this.state, fieldName)}
                        onChange={this.handleInputChange}
                    />
                </FormGroup>
            );
        });


        return (<Form>
            <h4>{this.state.abi.name}</h4>
            {
                this.renderDisabledField(
                    {
                        stateKey: "abi.constant",
                        stateField: this.state.abi.constant
                    }
                )
            }
            {
                this.renderDisabledField(
                    {
                        stateKey: "abi.payable",
                        stateField: this.state.abi.payable
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
                        onClick={this.callMethodOnTruffleContract}
                        block>
                        Call {this.state.abi.name}
                    </Button>

                </Col>

            </Row>
        </Form>);
    }
}