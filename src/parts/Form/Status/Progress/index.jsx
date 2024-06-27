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
    const [presentRanges, setPresentRanges] = useState(0);
    const [progress, setProgress] = useState(1);

    // NOTE • Effect
    useEffect(() => {
        const progress = data.reduce((acc, range) => acc + (range.end - range.start), 0);
        setProgress(progress.toFixed(1));
    }, [data]);

    return (
        <Jacket>

            <Bar $presentRanges={presentRanges} $isBig={isBig}>
                <span></span>
            </Bar>
            <Num $isBig={isBig}>
                {progress ? progress : '0'}%
            </Num>
        </Jacket>
    );
}

export default ProgressBar;