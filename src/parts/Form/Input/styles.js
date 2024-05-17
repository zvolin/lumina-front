// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp } from '@tackl';

// Exports
// ------------\
export const Field = styled.input(props => css`
    position: relative;
    width: 100%;
    padding: 1.2rem;
    border-radius: .6rem;
    background: ${props.$light ? props.theme.colors.global.black05 : props.theme.colors.global.white10};
    color: ${props.$light ? props.theme.colors.global.black : props.theme.colors.brand.bc2};
`);

export const Link = styled.a(props => css`
    position: absolute;
    right: 0;
    top: -3rem;
    z-index: 2;
    
    display: flex;
    gap: .3rem;
    justify-content: center;
    align-items: center;
    

    transition: all .3s ${props.theme.easing.bezzy};

    ${bp.large`
        opacity: 0;
        inset: 0;
        background: ${props.theme.colors.global.white};
        border-radius: .6rem;
    `}

    svg {
        width: 1.6rem;
        height: 1.6rem;
    }

    span {
        color: ${props.theme.colors.global.black};
        font-size: 1.2rem;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;

        background: linear-gradient(180deg, #CDB4DB 0%, #A2D2FF 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
    }
`);

export const Jacket = styled.div(
    props => css`
        position: relative;
        width: 100%;
        padding: .3rem;
        border-radius: .6rem;
        border: 1px solid ${props.theme.colors.brand.bc1};

        &:hover {
            ${Link} {
                opacity: 1;
            }
        }
    `
);