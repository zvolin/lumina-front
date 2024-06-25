'use client';

// Imports
// ------------
import React, { useEffect } from 'react';

// Component
// ------------
const TerminalLogs = ({ data }) => {
    useEffect(() => {
        console.log('data', data);
    }, []);

    return (
        <>
            {data && data.map((log, i) => (
                <>
                    <p key={i}>{log}</p>
                </>
            ))}
        </>
    );
}

export default TerminalLogs;