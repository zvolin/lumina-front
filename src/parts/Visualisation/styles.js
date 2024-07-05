// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div } from '@tackl';

// Exports
// ------------
export const Jacket = styled(Div)(props => css`
    position: relative;
    display: flex;
    flex: 1;
    flex-flow: column;
    align-items: center;
    justify-content: center;

    margin-bottom: 3.6rem;

    ${bp.large` margin-bottom: 0; `}
`);

export const Container = styled(Div)(
    props => css`
        position: relative;
        pointer-events: none;

        display: flex;
        flex-flow: column;
        gap: 1px;

        width: calc(100vw - 6.2rem);
        height: calc(100vw - 6.2rem);
        background: ${props.theme.colors.global.black10};
        border: 1px solid ${props.theme.colors.global.black10};

        ${bp.large`
            width: 42.08vw;
            height: 42.08vw;

            max-width: 64vh;
            max-height: 64vh;
            aspect-ratio: 1/1;
        `}

        .row {
            display: flex;
            flex-flow: row;
            flex: 1;
            gap: 1px;

            .grid-item {
                flex: 1;
                height: 100%;
                background-color: ${props.theme.colors.global.white};

                &.active {
                    background-color: ${props.theme.colors.brand.bc2};
                }
            }
        }
    `
);

export const SplineJacket = styled(Div)(props => css`
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    opacity: 0.2;
    z-index: -1;
    pointer-events: none;
`);