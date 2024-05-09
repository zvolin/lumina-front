'use client';

// Imports
// ------------
import React from 'react';
import Icon from '@icon';

// Styles
// ------------
import { Jacket, Field, Link, } from './styles';

// Component
// ------------
const Input = ({
    name,
    value,
    onChange,
    placeholder,
    type = 'text',
    light,
    hasCopy,
}) => {
    return (
        <Jacket>
            {hasCopy && (
                <Link href={hasCopy.link} rel="noopener noreferrer" target="_blank">
                    <Icon type="logoCelenium" />
                    <span>{hasCopy.label}</span>
                </Link>
            )}
            <Field $light={light} name={name} type={type} onChange={onChange} value={value ? value : ``} placeholder={placeholder} />
        </Jacket>
    );
}

export default Input;