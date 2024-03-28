// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Header } from '@tackl';

// Exports
// ------------
export const Jacket = styled(Header)(
    props => css`
        position: relative;
        padding-top: ${props.theme.space.small};
        padding-bottom: calc(${props.theme.space.small} / 2);
        border-bottom: 1px solid ${props.theme.colors.global.white};
    `
);
