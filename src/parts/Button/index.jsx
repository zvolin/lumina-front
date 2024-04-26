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
            {icon && icoL && (<Icon type={icon} />)}
            <span>{label}</span>
            {icon && icoR && (<Icon type={icon} />)}
        </Jacket>
    );
}

export default Button;