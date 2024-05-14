// Imports
// ------------
import React from 'react';
import Icon from '@icon';

// Styles
// ------------
import { Jacket } from './styles';

// Component
// ------------
const Link = ({ icon, label, link, rel, disabled }) => {
    return (
        <Jacket href={link} rel={rel} target={rel ? `_blank` : null} disabled={disabled}>
            <span><Icon type={icon} /></span>
            <span>{label}</span>
        </Jacket>
    );
}

export default Link;