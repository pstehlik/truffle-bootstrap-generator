import React from "react";
import { Input, Label, FormGroup } from 'reactstrap';


const TextField = ({ name, label, value, onChange, disabled }) => {

    return (
        <FormGroup >
            <Label for={name}>{label}</Label>
            <Input name={name} value={value} onChange={onChange} disabled={disabled}/>
        </FormGroup>
    );
};

export default TextField;