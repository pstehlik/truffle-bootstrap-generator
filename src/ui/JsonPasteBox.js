import React from 'react';
import { Col, Input, Row, Label, FormGroup } from 'reactstrap';
import AlertBox from './AlertBox';

export default class JsonPasteBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Row>
                <Col>
                    <FormGroup>
                        {this.props.parseStatus !== undefined &&
                            <AlertBox
                                text={this.props.parseStatusText}
                                color={this.props.parseStatus}
                            />
                        }
                        <Label for={this.props.name}><strong>Paste your Contract JSON</strong></Label>
                        <Input
                            type="textarea"
                            name={this.props.name}
                            rows="5"
                            onChange={this.props.onChange}
                            value={this.props.value}
                        />
                    </FormGroup>
                </Col>
            </Row>
        );
    }
}