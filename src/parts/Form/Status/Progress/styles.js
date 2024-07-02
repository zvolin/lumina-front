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
        width: ${props.$isBig ? `100%` : `auto`};
    `
);

export const Bar = styled.div(props => css`
    position: relative;
    order: ${props.$isBig ? 2 : 1};

    min-width: 12rem;
    width: 100%;
    max-width: 32rem;
    min-height: .8rem !important;
    max-height: .8rem !important;
    overflow: hidden;
    border-radius: .6rem;
    background: ${props.$isBig ? props.theme.colors.global.black05 : props.theme.colors.global.white};
    border: 1px solid ${props.theme.colors.global.black05};

    ${props.$isBig && css`
        min-height: 3.6rem !important;
        max-height: 3.6rem !important;
        min-width: 120%;
        max-width: auto;
        border-radius: 6rem;
    `}

    ${props.$ranges.map((range, index) => css`
        span:nth-of-type(${index + 1}) {
            position: absolute;
            z-index: 1;
            top: 0;
            left: ${((range.start - props.$min) / props.$window) * 100}% !important;
            height: 100%;
            width: ${((range.end - range.start) / props.$window) * 100}% !important;
            border-radius: 6rem;
            background: linear-gradient(180deg, #CDB4DB 0%, #A2D2FF 100%);
            transition: width .3s ease; 
        }
        `
    )};
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

export const Tooltip = styled.div(props => css`
    position: absolute !important;
    top: -1.2rem !important;
    opacity: 0 !important;
    z-index: 2 !important;

    display: flex;
    flex-direction: row;
    width: max-content !important;
    height: auto !important;
    gap: .6rem;

    padding: 1.2rem !important;
    border-radius: .6rem;
    background: ${props.theme.colors.global.black};
    color: ${props.theme.colors.global.white};
    font-family: ${props.theme.font.type.heading};
    font-size: 1.2rem;

    transition: all .3s ${props.theme.easing.bezzy};

    ${props.$isActive && css`
        opacity: 1 !important;
        top: -3.6rem !important;
    `}
`);