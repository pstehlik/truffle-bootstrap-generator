import React from 'react';
import { Col, Input, Row, Label, FormGroup } from 'reactstrap';
import AlertBox from './AlertBox';

const JsonPasteBox = ({parseStatus, parseStatusText, name, value, onChange }) => {
        return (
            <Row>
                <Col>
                    <FormGroup>
                        {parseStatus !== undefined &&
                            <AlertBox
                                text={parseStatusText}
                                color={parseStatus}
                            />
                        }
                        <Label for={name}><strong>Paste your Contract JSON</strong></Label>
                        <Input
                            type="textarea"
                            name={name}
                            rows="5"
                            onChange={onChange}
                            value={value}
                        />
                    </FormGroup>
                </Col>
            </Row>
        );
    
}


export default JsonPasteBox;