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
    background: ${props.$isBig ? props.theme.colors.global.black05 : props.theme.colors.global.white};

    ${props.$ranges.map((range) => css`
        span {
            position: absolute;
            z-index: 1;
            top: 0;
            left: ${((range.start - props.$min) / props.$window) * 100}% !important;
            height: 100%;
            width: ${((range.end - range.start) / props.$window) * 100}% !important;
            border-radius: .6rem;
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
    position: absolute;
    top: -1.2rem;
    opacity: 0;
    z-index: 2;

    display: flex;
    flex-direction: row;
    width: max-content;
    height: auto !important;
    gap: .6rem;

    padding: 1.2rem;
    border-radius: .6rem;
    background: ${props.theme.colors.global.black};
    color: ${props.theme.colors.global.white};
    font-family: ${props.theme.font.type.heading};
    font-size: 1.2rem;

    transition: all .3s ${props.theme.easing.bezzy};

    ${props.$isActive && css`
        opacity: 1;
        top: -3.6rem;
    `}
`);