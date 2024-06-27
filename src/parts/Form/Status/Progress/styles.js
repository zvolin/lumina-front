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
    order: ${props.$isBig ? 2 : 1};

    min-width: 12rem;
    max-width: 12rem;
    min-height: .8rem !important;
    max-height: .8rem !important;
    border-radius: .6rem;
    background: ${props.theme.colors.brand.bc4o30};
    ${props.$ranges.map((range) => css`
        span {
            position: absolute;
            z-index: 1;
            top: 0;
            left: ${range.start * 100}% !important;
            height: 100%;
            width: ${(range.end - range.start) * 100}% !important;
            border-radius: .6rem;
            background: linear-gradient(180deg, #CDB4DB 0%, #A2D2FF 100%);
            transition: width .3s ease;
            
        }
        `
    )};

    // TODO: somehow get those aligned
    ${props.$ranges.map((range) => css`
        p {
            text: ${range.start}-${range.end}
        }
        `
    )};

    /*${props.$isBig && css`
        min-height: 3.6rem !important;
        max-height: 3.6rem !important;
        min-width: 120%;
        max-width: auto;
        border-radius: 6rem;

        span {
            border-radius: 6rem;
        }
    `}*/
`);

export const Num = styled.span(props => css`
    order: ${props.$isBig ? 1 : 2};
    word-break: keep-all !important;

    ${props.$isBig && css`
        font-family: ${props.theme.font.type.heading};
        font-size: 3.6rem !important;
        font-weight: 500;
        opacity: 1 !important;
    `}
`);