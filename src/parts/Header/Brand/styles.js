// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div } from '@tackl';

// Exports
// ------------
export const Jacket = styled(Div)(
    props => css`
        position: relative;

        svg {
            fill: ${props.theme.colors.global.white};
        }
    `
);
