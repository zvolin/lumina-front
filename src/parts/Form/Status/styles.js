// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div, H5 } from '@tackl';
import { emStyles } from '@tackl/type';

// Exports
// ------------
export const Col = styled(Div)(props => css`
    ${props.$isCenter && css`
        display: flex;
        flex-direction: column;
        align-items: center;
    `}
`);

export const StickyJacket = styled(Div)(props => css`
    position: sticky;
    top: 0;
`);

export const Header = styled.div(props => css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 1.2rem;

    margin-bottom: 3.6rem;
    padding-bottom: 1.2rem;
    border-bottom: 1px solid ${props.theme.colors.global.black10};
`);

export const Title = styled(H5)(props => css`
    color: ${props.$dark ? props.theme.colors.global.black : props.theme.colors.global.white};
    font-size: 1.6rem;
`);

export const Switch = styled(Div)(props => css`
    display: flex;
    flex-direction: row;
    align-items: center;

    border-radius: 6rem;
    padding: .4rem;

    background: linear-gradient(180deg, #BDE0FE 0%, #CDB4DB 100%);
`);

export const Tab = styled.button(props => css`
    position: relative;
    z-index: 2;

    display: flex;
    justify-content: center;
    align-items: center;
    padding: .6rem 1.2rem;

    border-radius: 2.4rem;
    background: transparent;

    ${emStyles}
    color: ${props.theme.colors.global.white};

    ${props.disabled && css` background: transparent; `}

    ${props.isActive && css`
        color: ${props.theme.colors.brand.bc1};
        background: ${props.theme.colors.global.white};
    `}
`);

export const Basic = styled(Div)(props => css`
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
    align-items: center;
`);

export const Block = styled(Div)(props => css`
    position: relative;
    min-width: 60%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
    padding: 2.4rem;
    border-radius: 1.2rem;
    background: ${props.theme.colors.brand.bc4o20};

    div {
        display: flex;
        flex-direction: column;
        gap: 1.2rem;
        align-items: center;
    }
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
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        gap: 1.2rem;
        width: 100%;

        ${bp.large`
            gap: 2.4rem;
            flex-direction: ${props.$block ? `column` : `row`};
            align-items: ${props.$block ? `flex-start` : `center`};
        `}

        span {
            display: flex;
            flex-direction: row;
            gap: .6rem;
            justify-content: space-between;

            width: 100%;

            ${bp.large`
                flex-direction: column;
                width: max-content;
                min-width: max-content;
            `}
        }
    }
`);

export const FieldGroup = styled(Div)(props => css`
    display: flex;
    flex-direction: column;

    ${bp.large`
        flex-direction: row;
        gap: 2.4rem;
    `}
`);

export const ButtonJacket = styled(Div)(props => css`
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    ${bp.large`
        flex-direction: row;
        align-items: center;
        border-top: 1px solid ${props.theme.colors.global.black10};
        padding-top: 2.4rem;
    `}
`);

export const LinkGroup = styled(Div)(props => css`
    display: flex;
    flex-direction: row;
    gap: 2.4rem;

    width: 100%;
    border-top: 1px solid ${props.theme.colors.global.black10};
    padding-top: 2.4rem;
    margin-top: 2.4rem;

    ${bp.medium`
        gap: 3.6rem;
    `}

    ${bp.large`
        justify-content: flex-end;
        margin-top: 0;
        border: none;
        padding-top: 0;
    `}
`);

export const CelLink = styled.a(props => css`
    position: relative;
    z-index: 2;
    
    display: flex;
    gap: .3rem;
    justify-content: center;
    align-items: center;
    

    transition: all .3s ${props.theme.easing.bezzy};

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


export const Terminal = styled(Div)(props => css`
    position: relative;
    z-index: 2;

    border: 1px solid ${props.theme.colors.global.white};
    border-width: 18px 2px 2px 2px;
    border-radius: .3rem;
    padding: 2.4rem;

    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    background: linear-gradient(180deg, rgba(255, 200, 221, 0.8) 0%, rgba(189, 224, 254, 0.8) 100%);
    box-shadow: 12px 4px 24px rgba(0, 0, 0, 0.12);

    &:before {
        content: '';
        position: absolute;
        top: -1.2rem; left: .6rem;
        z-index: 2;

        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${props.theme.colors.brand.bc4};
    }

    &:after {
        content: '';
        position: absolute;
        top: -1.2rem; left: 1.6rem;
        z-index: 2;

        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${props.theme.colors.brand.bc3};
    }

    div {
        display: flex;
        flex-direction: row;

        width: 100%;
    }
`);