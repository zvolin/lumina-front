// Imports
// ------------
import styled, { css } from 'styled-components';
import { emStyles } from '@tackl/type';

// Exports
// ------------
export const Jacket = styled.a(
    props => css`
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1.2rem;

        &:hover {
            cursor: pointer !important;
            
            span:first-child {
                transform: scale(0.95);
            }

            span:last-child {
                color: ${props.$isLight ? props.theme.colors.global.white : props.theme.colors.global.black};
            }
        }

        div {
            display: flex;
            flex-direction: column;
            gap: 0rem;

            em {
                ${emStyles}
                font-size: 1.1rem;
                color: ${props.$isLight ? props.theme.colors.global.white : props.theme.colors.global.black};
            }
        }

        span {
            transition: all .4s ${props.theme.easing.bezzy};

            &:first-child {
                border-radius: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 12px;
                gap: 10px;

                width: 48px;
                height: 48px;
                background: linear-gradient(180deg, #CDB4DB 0%, #A2D2FF 100%);
            }

            &:last-child {
                ${emStyles}
                color: ${props.$isLight ? props.theme.colors.global.white : props.theme.colors.global.black60};
            }
        }

        ${props.disabled && css`
            pointer-events: none;
            
            span {
                opacity: .3;
            }
        `}
    `
);
