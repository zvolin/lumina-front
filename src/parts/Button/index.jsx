// Imports
// ------------
import React from 'react';
import Icon from '@icon';

// Styles
// ------------
import { Jacket } from './styles';

// Component
// ------------
const Button = ({ label, onClick, icon, icoL, icoR, disabled }) => {
    return (
        <Jacket onClick={onClick} disabled={disabled}>
            {icon && icoL && (<span><Icon type={icon} /></span>)}
            <span>{label}</span>
            {icon && icoR && (<span><Icon type={icon} /></span>)}
        </Jacket>
    );
}

export default Button;