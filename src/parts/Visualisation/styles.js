// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div } from '@tackl';

// Exports
// ------------
export const Jacket = styled(Div)(props => css`
    position: relative;
`);

export const Container = styled(Div)(
    props => css`
        position: relative;
        pointer-events: none;
        padding: 1px;

        display: grid;
        grid-template-columns: repeat(32, 1fr);
        grid-template-rows: repeat(32, 1fr);
        grid-gap: 1px;

        width: 42.08vw;
        height: 42.08vw;

        background: ${props.theme.colors.global.black10};

        .grid-item {
            background: white;
        }

        .selected {
            background: ${props.theme.colors.brand.bc4};
        }
    `
);

export const SplineJacket = styled(Div)(props => css`
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
`);