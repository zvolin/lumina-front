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
    return (
        <Jacket>
            <Field $light={light} name={name} type={type} onClick={onClick} onChange={onChange} placeholder={placeholder} defaultValue={value ? value : ``} />
        </Jacket>
    );
}

export default Textarea;