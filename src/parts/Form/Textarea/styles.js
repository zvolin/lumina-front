// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp } from '@tackl';

// Exports
// ------------
export const Field = styled.textarea(props => css`
    position: relative;
    width: 100%;
    min-width: 100%;
    max-width: 100%;
    height: auto;
    min-height: 14rem;
    max-height: 20rem;

    padding: 1.2rem;
    border-radius: .6rem;
    background: ${props.$light ? props.theme.colors.global.black05 : props.theme.colors.global.white10};
    color: ${props.$light ? props.theme.colors.global.black : props.theme.colors.brand.bc2};
`);

export const Jacket = styled.div(
    props => css`
        position: relative;
        width: 100%;
        padding: .3rem;
        border-radius: .6rem;
        border: 1px solid ${props.theme.colors.brand.bc1};
    `
);