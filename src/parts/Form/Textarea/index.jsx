'use client';

// Imports
// ------------
import React from 'react';

// Styles
// ------------
import { Jacket, Field } from './styles';

// Component
// ------------
const Textarea = ({
    name,
    value,
    onChange,
    onClick,
    placeholder,
    type = 'text',
    light,
}) => {
    const val = value ? value.toString() : null;
    const newValue = val.replaceAll(',', '\n');

    return (
        <Jacket>
            <Field $light={light} name={name} type={type} onClick={onClick} onChange={onChange} placeholder={placeholder} defaultValue={value ? newValue : ``} />
        </Jacket>
    );
}

export default Textarea;