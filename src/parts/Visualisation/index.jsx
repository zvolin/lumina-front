'use client';

// Imports
// ------------
import React, { useRef, useEffect, useState } from 'react';

// Styles
// ------------
import { Jacket, Container } from './styles';

// Component
// ------------
const Visualisation = ({ data }) => {
    // NOTE • States
    const [currentHeight, setCurrentHeight] = useState(0);
    const [newHeight, setNewHeight] = useState(0);

    // NOTE • Generate Grid
    const containerRef = useRef(null);

    // NOTE • Generate Grid
    const generateSpans = () => {
        const spans = [];
        for (let i = 1; i <= 1024; i++) {
            spans.push(<span key={i} className="grid-item"></span>);
        }
        return spans;
    };

    // NOTE • Highlight Random Squares
    function highlightRandomSquares(num) {
        const squares = document.querySelectorAll('.grid-item');
        const indices = [];

        // Remove selected class from all squares
        squares.forEach(square => {
            square.classList.remove('selected');
        });

        // Generate unique random indices
        while (indices.length < num) {
            const index = Math.floor(Math.random() * squares.length);
            if (!indices.includes(index)) {
                indices.push(index);
            }
        }

        // Highlight random squares
        indices.forEach(index => {
            squares[index].classList.add('selected');
        });
    }

    // NOTE • Interval highlight when data changes
    useEffect(() => {
        function getNumber(num) {
            const numberBeforeX = num && num.substring(0, num.indexOf('x'));

            return parseInt(numberBeforeX, 10);
        }

        let number = getNumber(data.networkHeadDataSquare);

        // Set new height
        setNewHeight(number);

        if(newHeight > currentHeight) {
            setCurrentHeight(newHeight);
        }

        // Highlight random squares
        if(newHeight > currentHeight) {
            highlightRandomSquares(newHeight);
        }
    }, [data]);

    return (
        <Jacket>
            <Container ref={containerRef}>{generateSpans()}</Container>
        </Jacket>
    );
}

export default Visualisation;