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

        display: grid;
        grid-template-columns: repeat(32, 1fr);
        grid-template-rows: repeat(32, 1fr);

        border-top: 1px solid ${props.theme.colors.global.black10};
        border-left: 1px solid ${props.theme.colors.global.black10};

        width: calc(100vw - 6.2rem);
        height: calc(100vw - 6.2rem);

        ${bp.large`
            width: 42.08vw;
            height: 42.08vw;

            max-width: 64vh;
            max-height: 64vh;
            aspect-ratio: 1/1;
        `}

        .grid-item {
            position: relative;
            border-right: 1px solid ${props.theme.colors.global.black10};
            border-bottom: 1px solid ${props.theme.colors.global.black10};

            &:before {
                content: '';
                position: absolute;
                inset: 0;
                background: ${props.theme.colors.brand.bc3};
                opacity: 0;

                transition: opacity .3s ease-in-out;
                transition-delay: 1s;
                will-change: opacity;
            }

            &.selected {
                &:before {
                    opacity: 1;
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