// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp } from '@tackl';

// Exports
// ------------
export const Jacket = styled.div(
    props => css`
        position: relative;
        width: 100%;
        padding: .3rem;
        border-radius: .6rem;
        border: 1px solid ${props.theme.colors.brand.bc1};
    `
);

export const Field = styled.input(props => css`
    position: relative;
    width: 100%;
    padding: 1.2rem;
    border-radius: .6rem;
    background: ${props.$light ? props.theme.colors.global.black05 : props.theme.colors.global.white10};
    color: ${props.$light ? props.theme.colors.global.black : props.theme.colors.brand.bc2};
`);
