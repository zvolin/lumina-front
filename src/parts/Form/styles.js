// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, H3 } from '@tackl';

// Exports
// ------------
export const Jacket = styled(Section)(
    props => css`
        position: absolute;
        inset: 0 2.4rem;
        // padding-top: 25vh;
        overflow: hidden;

        display: flex;
        align-items: flex-end;

        ${props.$modal === 3 && css`
            padding-top: 25vh;
            align-items: flex-start;
            overflow: scroll;
        `}
    `
);

export const Container = styled(Div)(props => css`
    position: relative;

    padding: 2.4rem;
    width: 100%;
    border-radius: .8rem .8rem 0 0;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    font-family: ${props.theme.font.type.body};
    font-size: 1.6rem;
    color: ${props.theme.colors.global.white};

    transition: all 1.2s ${props.theme.easing.bezzy};

    ${bp.large` padding: 3.6rem; `}

    ${props.$begin && css`
        z-index: 1;
        background: ${props.theme.colors.global.black};
    `}

    ${props.$network && css`
        z-index: 2;
        background: #2B2B2B;
        transform: translateY(${props.$activated ? 0 : `100%`});

        ${bp.large`
            width: calc(100% - 3.6rem);
            margin-left: 3.6rem;
        `}
    `}

    ${props.$go && css`
        z-index: 3;
        background: ${props.theme.colors.global.white};
        transform: translateY(${props.$activated ? 0 : `100%`});

        color: ${props.theme.colors.global.black};

        ${bp.large`
            width: calc(100% - 7.2rem);
        `}
    `}
`);

export const Title = styled(H3)(props => css`
    color: ${props.theme.colors.global.white};
`);