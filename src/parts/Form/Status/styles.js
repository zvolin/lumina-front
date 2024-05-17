// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div, H3 } from '@tackl';

// Exports
// ------------
export const Col = styled(Div)(props => css``);

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
            width: max-content;
            min-width: max-content;
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

    ${bp.medium` flex-direction: row; `}

    ${bp.large`
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