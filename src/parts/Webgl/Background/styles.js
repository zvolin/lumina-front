// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section } from '@tackl';

// Exports
// ------------
export const Jacket = styled(Section)(
    props => css`
        position: fixed;
        inset: 0;
        z-index: -1;
        overflow: hidden;
        
        img {
            position: absolute;
            width: 100%;
            height: 100%;
            max-width: 90rem;
            max-height: 90rem;
            mix-blend-mode: plus-lighter;
            inset: unset !important;

            &.br {
                bottom: -20% !important;
                right: -10% !important;
            }

            &.tl {
                top: -40% !important;
                left: -10% !important;
            }
        }
    `
);
