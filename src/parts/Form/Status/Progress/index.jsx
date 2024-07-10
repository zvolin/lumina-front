'use client';

// Imports
// ------------
import React, { useState, useEffect } from 'react';
import { usePlausible } from 'next-plausible';

// Styles
// ------------
import { Jacket, Bar, Num, Tooltip } from './styles';

// Component
// ------------
const ProgressBar = ({ ranges, max, window, syncedPercentage, isBig }) => {
    // NOTE • State
    const [tooltipActive, setTooltipActive] = useState(false);

    // NOTE • Tooltip
    const handleTooltip = () => setTooltipActive(!tooltipActive);

    // NOTE • Track Plausible
    const plausible = usePlausible();

    useEffect(() => {
        if(syncedPercentage === 10) {
            plausible('Progress 10%');
        }

        if(syncedPercentage === 50) {
            plausible('Progress 50%');
        }

        if(syncedPercentage === 100) {
            plausible('Progress 100%');
        }
    }, [syncedPercentage]);

    return (
        <Jacket $isBig={isBig} onMouseEnter={handleTooltip} onMouseLeave={handleTooltip}>
            <Tooltip $isActive={tooltipActive}>
                {ranges && ranges.map((range, i) => (
                    <p key={i}>{range.start}-{range.end}</p>
                ))}
            </Tooltip>
            <Bar $ranges={ranges} $min={max - window} $window={window} $isBig={isBig} $syncedPercentage={syncedPercentage}>
                {[...Array(ranges.length)].map((e, i) => <span key={i}></span>)}
            </Bar>
            <Num $isBig={isBig}>
                {syncedPercentage ? syncedPercentage.toLocaleString(undefined, {maximumFractionDigits:2}) : '0'}%
            </Num>
        </Jacket>
    );
}

export default ProgressBar;