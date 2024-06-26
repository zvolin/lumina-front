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
    console.dir(data);

    return (
        <>
            {
                data.map((log, index) => {
                    let res = log[0][1].split(':');

                    return (
                        <Item key={index}>
                            <span>{res[0]}:</span>
                            <span>{res[1]}</span>
                        </Item>
                    )
                })
            }
        </>
    );
}

export default TerminalLogs;