'use client';

// Imports
// ------------
import React from 'react';

// Styles
// ------------
import { Jacket } from './styles';

// Component
// ------------
const Input = ({
    value,
    onChange,
    placeholder,
    type = 'text',
}) => {
    return (
        <Jacket type={type} onChange={onChange} value={value ? value : ``} placeholder={placeholder} />
    );
}

export default Input;