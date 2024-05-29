'use client';

// Imports
// ------------
import React from 'react';
import Icon from '@icon';

// Styles
// ------------
import { Jacket, Field } from './styles';

// Component
// ------------
const Input = ({
    name,
    value,
    onChange,
    placeholder,
    type = 'text',
    light,
}) => {
    return (
        <Jacket>
            <Field $light={light} name={name} type={type} onChange={onChange} value={value ? value : ``} placeholder={placeholder} />
        </Jacket>
    );
}

export default Input;