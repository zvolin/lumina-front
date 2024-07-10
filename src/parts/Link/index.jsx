// Imports
// ------------
import React from 'react';
import Icon from '@icon';

// Styles
// ------------
import { Jacket } from './styles';

// Component
// ------------
const Link = ({ icon, label, preText, link, rel, disabled, onClick }) => {
    return (
        <Jacket href={link} rel={rel} target={rel ? `_blank` : null} disabled={disabled} onClick={onClick}>
            <span><Icon type={icon} /></span>
            {preText && disabled ? (
                <div>
                    {preText && <em>{preText}</em>}
                    <span>{label}</span>
                </div>
            ) : (
                <span>{label}</span>
            )}
        </Jacket>
    );
}

export default Link;