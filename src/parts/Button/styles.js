// Imports
// ------------
import styled, { css } from 'styled-components';
// import { bp } from '@tackl';
import { emStyles } from '@tackl/type';

// Exports
// ------------
export const Jacket = styled.button(
    props => css`
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1.2rem;
        width: max-content;
        border-radius: 3.6rem;
        padding: 1.2rem 2.4rem;

        background: linear-gradient(180deg, #CDB4DB 0%, #A2D2FF 100%);

        transition: all .4s ${props.theme.easing.bezzy};

        &:hover {
            cursor: pointer !important;
            transform: scale(0.95);
        }

        svg {
            width: 1.6rem;
            height: 1.6rem;
        }

        span {
            ${emStyles}
            text-transform: uppercase;
            color: ${props.theme.colors.global.white};
        }
    `
);
