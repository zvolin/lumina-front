// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div } from '@tackl';

// Exports
// ------------
export const Jacket = styled(Section)(
    props => css`
        
    `
);

export const SplineJacket = styled(Div)(props => css`
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    opacity: 1;
    z-index: 1;
    pointer-events: none;
`);

export const Panel = styled(Div)(props => css`
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;

    width: 80%;

    border: 1px solid ${props.theme.colors.global.white};
    border-width: 18px 2px 2px 2px;
    border-radius: .3rem;
    padding: 2.4rem;

    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    
    background: linear-gradient(180deg, rgba(255, 200, 221, 0.8) 0%, rgba(189, 224, 254, 0.8) 100%);
    box-shadow: 12px 4px 24px rgba(0, 0, 0, 0.12);

    ${bp.large` width: auto; `}

    &:before {
        content: '';
        position: absolute;
        top: -1.2rem; left: .6rem;
        z-index: 2;

        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${props.theme.colors.brand.bc4};
    }

    &:after {
        content: '';
        position: absolute;
        top: -1.2rem; left: 1.6rem;
        z-index: 2;

        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${props.theme.colors.brand.bc3};
    }
`);

export const List = styled.ul(props => css`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    li {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1.2rem;
    }
`);