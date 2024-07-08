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
    placeholder,
    type = 'text',
    light,
}) => {
    const val = value ? value.toString() : null;
    const newValue = val.replaceAll(',', '\n');

    return (
        <Jacket>
            <Field $light={light} name={name} type={type} onChange={onChange} placeholder={placeholder} value={value ? newValue : ``} />
        </Jacket>
    );
}

export default Textarea;