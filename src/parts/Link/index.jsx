// Imports
// ------------
import React from 'react';
import Icon from '@icon';

// Styles
// ------------
import { Jacket } from './styles';

// Component
// ------------
const Link = ({ icon, label, link, disabled }) => {
    return (
        <Jacket href={link} disabled={disabled}>
            <span><Icon type={icon} /></span>
            <span>{label}</span>
        </Jacket>
    );
}

export default Link;