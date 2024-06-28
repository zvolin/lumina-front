'use client';

// Imports
// ------------
import React, { useState, useEffect } from 'react';

// Styles
// ------------
import { Jacket, Bar, Num } from './styles';

import styled, { css } from 'styled-components';


// Component
// ------------
const ProgressBar = ({ ranges, max, isBig }) => {
    // NOTE • State
    //const [presentRanges, setPresentRanges] = useState([]);
    const [progress, setProgress] = useState(0);

    // NOTE • Effect
    useEffect(() => {
        console.log("ranges:", ranges);
        const progress = ranges.reduce((acc, range) => acc + (range.end - range.start), 0);
        setProgress(progress.toFixed(3) * 100);
        
    }, [ranges]);

    return (
        <Jacket>
            <Bar $ranges={ranges} $max={max} $isBig={isBig}>
                <span></span>
            </Bar>
            <Num $isBig={isBig}>
                {progress ? progress : '0'}%
            </Num>
        </Jacket>
    );
}

export default ProgressBar;