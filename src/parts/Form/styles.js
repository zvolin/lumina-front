
// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, Div, H3 } from '@tackl';

// Exports
// ------------
export const Blanket = styled(Div)(props => css`
    overflow: hidden;
    position: absolute;
    top: 0;
    z-index: 14;
    width: 100%;
    min-height: 100%;
    ${props.theme.vh};
`);

export const ImageContainer = styled(Div)(props => css`
    position: absolute;
    bottom: 35vh;
    left: 50%;
    transform: translateX(-50%) scale(1.3) rotate(-5deg);

    transition: all 1.2s ${props.theme.easing.bezzy};

    ${bp.large`
        bottom: 15vh;
        transform: translateX(-50%) scale(1) rotate(0deg);
    `}

    ${props.$active && css`
        bottom: 60vh;
        transform: translateX(-30%) scale(2) rotate(-15deg);

        ${bp.large` transform: translateX(-50%) scale(3) rotate(-15deg); `}
    `}
`);

export const Container = styled(Div)(props => css`
    position: relative;
    width: 100%;

    padding: 2.4rem 2.4rem;
    border-radius: .8rem .8rem 0 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
        transform: translateY(${props.$activated ? 0 : `102%`});

        ${bp.large`
            width: calc(100% - 3.6rem);
            margin-left: 3.6rem;
        `}
    `}

    ${props.$go && css`
        z-index: 3;
        background: ${props.theme.colors.global.white};
        transform: translateY(${props.$activated ? 0 : `102%`});

        color: ${props.theme.colors.global.black};
        min-height: 80vh;

        ${bp.large`
            width: calc(100% - 7.2rem);
            margin-left: 7.2rem;
        `}
    `}

    div.add-gap {
        display: flex;
        flex-direction: column;
        gap: 2.4rem;
    }
`);

export const Jacket = styled(Section)(
    props => css`
        position: absolute;
        inset: 0;
        overflow: hidden;

        display: flex;
        align-items: flex-end;
        padding-top: 20vh;

        ${bp.large` inset: 0 2.4rem; `}

        ${props.$modal === 3 && css`
            inset: 0;
            overflow: scroll;
            align-items: flex-end;

            ${props.$statusInitiated && css`
                align-items: flex-start;
            `}

            ${bp.large`
                inset: 0 2.4rem;
            `}

            ${Container} {
                padding: 2.4rem 0;
                justify-content: stretch;

                > div {
                    flex: 1;
                }

                ${bp.large`
                    padding: 3.6rem;
                `}
            }
        `}
    `
);

export const ScrollableArea = styled(Div)(props => css`
    position: relative;
    display: flex;
    align-items: flex-start;
    
    background: blue;
    min-height: 110%;
`);

export const Header = styled.div(props => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1.2rem;

    margin-bottom: 3.6rem;
`);

export const Title = styled(H3)(props => css`
    color: ${props.$dark ? props.theme.colors.global.black : props.theme.colors.global.white};
`);

export const Progress = styled.div(props => css`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: .6rem;

    svg {
        width: 1.6rem;
        height: 1.6rem;
    }

    span {
        text-transform: uppercase;
        font-size: 1.3rem;
        font-weight: 700;
        color: ${props.theme.colors.brand.bc4};
    }
`);

export const NetworkList = styled.ul(props => css`
    position: relative;
    display: flex;
    flex-direction: row;
    gap: .1rem;

    border-radius: .6rem;
    border: 1px solid ${props.theme.colors.brand.bc1};
    padding: .4rem;
`);

export const NetworkItem = styled.li(props => css`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    
    background: ${props.theme.colors.global.white10};
    overflow: hidden;

    transition: all .4s ${props.theme.easing.bezzy};

    &:hover {
        background: ${props.theme.colors.global.white20};
    }

    label {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: .6rem;

        padding: 1.2rem 2.4rem;
        width: 100%;

        svg {
            width: 0;
            fill: ${props.theme.colors.global.white};
            transform: scale(0);
            transition: all .2s ${props.theme.easing.bezzy};
        }

        span {
            position: relative;
        }

        &:hover {
            cursor: pointer;
        }
    }

    input {
        display: none;
    }

    &:first-child {
        border-radius: .6rem 0 0 .6rem;
    }

    &:last-child {
        border-radius: 0 .6rem .6rem 0;
    }

    &:before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        
        background: linear-gradient(180deg, #CDB4DB 0%, #A2D2FF 100%);
        opacity: 0;
        
        transition: all .6s ${props.theme.easing.bezzy};
    }

    ${props.$selected && css`
        &:before {
            opacity: 1;
        }

        label {
            svg {
                width: auto;
                transform: scale(1);
            }
        }
    `}

    ${props.$disabled && css`
        opacity: 0.4;
        pointer-events: none;
        
        label {
            span {
                &:after {
                    content: '';
                    position: absolute;
                    left: 0; right: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 2;
                    height: 1px;
                    background: ${props.theme.colors.global.white};
                }
            }
        }
    `}
`);

export const StatsItem = styled.div(props => css`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 2.4rem;

    ${props.$block && css`
        margin-top: 2.4rem;
        margin-bottom: 3.6rem;

        label {
            gap: 1.2rem;
        }
    `}

    label {
        display: flex;
        flex-direction: ${props.$block ? `column` : `row`};
        align-items: ${props.$block ? `flex-start` : `center`};
        justify-content: flex-start;
        gap: 2.4rem;
        width: 100%;

        span {
            width: max-content;
            min-width: max-content;
        }
    }
`);

export const PeerList = styled.ul(props => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: .3rem;

    min-height: 8rem;
    max-height: 15rem;
    overflow: hidden;
    overflow-y: scroll;

    position: relative;
    width: 100%;
    padding: .3rem;
    border-radius: .6rem;
    border: 1px solid ${props.theme.colors.brand.bc1};

    li {
        position: relative;
        width: 100%;
        padding: 1.2rem;
        border-radius: .6rem;
        background: ${props.theme.colors.global.black05};
    }
`);

export const Col = styled(Div)(props => css``);

export const FieldGroup = styled(Div)(props => css`
    display: flex;
    flex-direction: row;
    gap: 2.4rem;
`);

export const ButtonJacket = styled(Div)(props => css`
    position: relative;
    border-top: 1px solid ${props.theme.colors.global.black10};
    padding-top: 2.4rem;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    ${bp.medium` flex-direction: row; `}
`);

export const LinkGroup = styled(Div)(props => css`
    display: flex;
    flex-direction: column;
    gap: 3.6rem;
    width: 100%;

    ${bp.medium` flex-direction: row; `}
`);