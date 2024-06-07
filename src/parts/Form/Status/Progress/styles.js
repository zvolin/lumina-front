// Imports
// ------------
import styled, { css } from 'styled-components';

// Exports
// ------------
export const Jacket = styled.div(
    props => css`
        position: relative;
        display: flex;
        align-items: center;
        gap: 1.2rem;
    `
);

export const Bar = styled.div(props => css`
    position: relative;
    min-width: 12rem;
    height: .8rem;
    border-radius: .6rem;
    background: ${props.theme.colors.brand.bc4o30};

    span {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        height: 100%;
        width: ${props.$progressNumber}% !important;
        border-radius: .6rem;
        background: linear-gradient(180deg, #CDB4DB 0%, #A2D2FF 100%);
        transition: width .3s ease;
    }
`);