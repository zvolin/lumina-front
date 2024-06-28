'use client';

// Imports
// ------------
import React, { useState, useEffect } from 'react';

// Styles
// ------------
import { Jacket, Bar, Num, Tooltip, } from './styles';

// Component
// ------------
const ProgressBar = ({ ranges, max, window, isBig }) => {
    // NOTE • State
    //const [presentRanges, setPresentRanges] = useState([]);
    const [progress, setProgress] = useState(0);
    const [tooltipActive, setTooltipActive] = useState(false);

    // NOTE • Effect
    useEffect(() => {
        // console.log("ranges:", ranges);
        const progress = ranges.reduce((acc, range) => acc + (range.end - range.start), 0);
        setProgress((progress/window).toFixed(4) * 100);
        
    }, [ranges]);

    // NOTE • Tooltip
    const handleTooltip = () => setTooltipActive(!tooltipActive);

    return (
        <Jacket onMouseEnter={handleTooltip} onMouseLeave={handleTooltip}>
            <Tooltip $isActive={tooltipActive}>
                {ranges && ranges.map((range) => (
                    <p>{range.start}-{range.end}</p>
                ))}
            </Tooltip>
            <Bar $ranges={ranges} $min={max - window} $window={window} $isBig={isBig}>
                <span></span>
            </Bar>
            <Num $isBig={isBig}>
                {progress ? progress.toLocaleString(undefined, {maximumFractionDigits:2}) : '0'}%
            </Num>
        </Jacket>
    );
}

export default ProgressBar;