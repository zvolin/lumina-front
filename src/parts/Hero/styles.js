// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section, H1 } from '@tackl';

// Exports
// ------------
export const Jacket = styled(Section)(
    props => css`
        position: relative;
        padding: ${props.theme.space.small} 0;
    `
);

export const Title = styled(H1)(props => css`
    color: ${props.theme.colors.global.white};
`);