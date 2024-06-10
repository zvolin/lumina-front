'use client';

// Imports
// ------------
import React, { useState, useEffect } from 'react';

// Styles
// ------------
import { Jacket, Bar } from './styles';

// Component
// ------------
const ProgressBar = ({ data }) => {
    // NOTE • State
    const [progress, setProgress] = useState(0);

    // NOTE • Effect
    useEffect(() => {
        // Split data into 2 parts
        const [current, total] = data.split('/').map(Number);

        // Set progress
        setProgress(Math.round((current / total) * 100));

        console.log('Progress:', current / total * 100);
    }, [data]);

    return (
        <Jacket>
            <Bar $progressNumber={progress}>
                <span></span>
            </Bar>
            <div>
                {progress ? progress : '--'}/100%
            </div>
        </Jacket>
    );
}

export default ProgressBar;