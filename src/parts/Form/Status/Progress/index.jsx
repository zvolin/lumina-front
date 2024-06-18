'use client';

// Imports
// ------------
import React, { useState, useEffect } from 'react';

// Styles
// ------------
import { Jacket, Bar, Num } from './styles';

// Component
// ------------
const ProgressBar = ({ data, isBig }) => {
    // NOTE • State
    const [progress, setProgress] = useState(0);

    // NOTE • Effect
    useEffect(() => {
        // Split data into 2 parts
        const [current, total] = data.split('/').map(Number);

        // Calculate progress as a percentage and set the value without rounding it
        let progress = (current / total) * 100;
        setProgress(progress);

        // .toFixed(2) gives it 2 digits of precision after the dot, for example 45.56%
        console.log('Progress:', progress.toFixed(2) + '%');
    }, [data]);

    return (
        <Jacket>
            <Bar $progressNumber={progress} $isBig={isBig}>
                <span></span>
            </Bar>
            <Num $isBig={isBig}>
                {progress ? progress.toFixed(2) : '0'}%
            </Num>
        </Jacket>
    );
}

export default ProgressBar;