'use client';

// Imports
// ------------
import React, { useRef, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

// Styles
// ------------
import { Jacket, Container, SplineJacket } from './styles';

// Component
// ------------
const Visualisation = ({ data }) => {
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
            const numberBeforeX = num.substring(0, num.indexOf('x'));

            return parseInt(numberBeforeX, 10);
        }

        let number = getNumber(data.networkHeadDataSquare);

        // Highlight random squares
        highlightRandomSquares(number);
    }, [data]);

    return (
        <Jacket>
            <Container ref={containerRef}>{generateSpans()}</Container>
            <SplineJacket>
                <Spline scene="https://prod.spline.design/vS5y3FkvJJqrWPgq/scene.splinecode" />
            </SplineJacket>
        </Jacket>
    );
}

export default Visualisation;