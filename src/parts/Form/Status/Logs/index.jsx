'use client';

// Imports
// ------------
import React from 'react';

// Styles
// ------------
import { Item } from './styles';

// Component
// ------------
const TerminalLogs = ({ data }) => {
    return (
        <>
            {
                data.map((log, index) => {
                    return (
                        <Item key={index}>
                            <span>{log}</span>
                        </Item>
                    )
                })
            }
        </>
    );
}

export default TerminalLogs;
