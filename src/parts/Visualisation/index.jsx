'use client';

// Imports
// ------------
import React, { useRef, useEffect, useState } from 'react';

// Styles
// ------------
import { Jacket, Container } from './styles';

// Component
// ------------
const Visualisation = ({ data, events }) => {
    // console.table("samples", events.data.get("event").shares);
    const shares = events.data.get("event").shares;

    // NOTE • Refs
    const containerRef = useRef(null);

    // NOTE • States
    const [activeCoords, setActiveCoords] = useState([]);

    // NOTE • Functions
    useEffect(() => {
        // Set the active coordinates state when the component mounts
        setActiveCoords(shares);
    }, []);

    const isActive = (x, y) => {
        return activeCoords.some(coord => coord[0] === x && coord[1] === y);
    };

    const renderGrid = () => {
        const rows = [];
        for (let i = 0; i < 32; i++) {
            const cols = [];
            for (let j = 0; j < 32; j++) {
                const key = `${i}-${j}`;
                cols.push(
                    <span key={key} className={`grid-item ${isActive(i, j) ? 'active' : ''}`}>
                    {/* Optionally add content here */}
                    </span>
                );
            }
            rows.push(
                <div key={i} className="row">
                    {cols}
                </div>
            );
        }
        return rows;
    };

    return (
        <Jacket>
            <Container ref={containerRef}>{renderGrid()}</Container>
        </Jacket>
    );
}

export default Visualisation;