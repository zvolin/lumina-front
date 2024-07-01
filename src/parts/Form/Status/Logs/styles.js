// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Div } from '@tackl';

// Exports
// ------------
export const Item = styled(Div)(
    props => css`
        position: relative;

        font-family: ${props.theme.font.type.heading};
        font-size: 1.2rem;
        line-height: 1.4rem;
        word-break: break-word;
    `
);
