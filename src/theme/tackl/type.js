// Imports
// ------
import { css } from 'styled-components';
import { breakpointUp } from './breakpoints';
import { semantics, gridSemantics } from './semantics';
import { theme } from '../';

// Exports
// --------------
// 1. Shared Heading Styles
// --------------
const sharedHeadingStyles = (props) => css`
	font-weight: ${theme.font.weight.reg};
	font-family: ${theme.font.type.heading};
	letter-spacing: -0.02em;
	${gridSemantics}
	${semantics}
`;

// --------------
// 2. Heading Styles
// --------------
export const h0Styles = css`
	${sharedHeadingStyles}
	font-size: 6rem;
	line-height: 1.2;

	${breakpointUp.smedium`
		font-size: 6.8rem;
	`}

	${breakpointUp.xlarge`
		font-size: 16.8rem;
	`}
`;

export const h1Styles = css`
	${sharedHeadingStyles}
	font-size: 4.8rem;
	line-height: 1.1;

	${breakpointUp.xlarge`
		font-size: 8rem;
	`}
`;

export const h2Styles = css`
	${sharedHeadingStyles}
	font-size: 3.6rem;
	line-height: 1.2;

	${breakpointUp.xlarge` font-size: 6.2rem; `}
`;

export const h3Styles = css`
	${sharedHeadingStyles}
	font-size: 2.8rem;
	line-height: 1.2;

	${breakpointUp.xlarge` font-size: 4rem; `}
`;

export const h4Styles = css`
	${sharedHeadingStyles}
	font-size: 2.2rem;
	line-height: 1.2;

	${breakpointUp.large` font-size: 3.2rem; `}
`;

export const h5Styles = css`
	${sharedHeadingStyles}
	font-size: 1.8rem;
	line-height: 1.2;

	${breakpointUp.large` font-size: 2.4rem; `}
`;

export const h6Styles = (props) => css`
	${sharedHeadingStyles}
	font-size: 1.5rem;
	line-height: 1.2;
	font-weight: ${theme.font.weight.semi};
	text-transform: uppercase;

	${breakpointUp.large` font-size: 2rem; `}
`;

// --------------
// 3. Shared Body Styles
// --------------
const sharedBodyStyles = (props) => css`
	font-family: ${theme.font.type.body};
	font-weight: ${theme.font.weight.reg};
	${gridSemantics}
	${semantics}
`;

// --------------
// 3. Body Styles
// --------------
export const pStyles = (props) => css`
	${sharedBodyStyles}
	font-size: 1.6rem;
	line-height: 1.4;

	${breakpointUp.xlarge`
		font-size: 1.8rem;
	`}
`;

export const spanStyles = (props) => css`
	${sharedBodyStyles}

	font-size: 1.4rem;
	line-height: 1.2;

	${breakpointUp.xlarge` font-size: 1.8rem; `}
`;

export const emStyles = (props) => css`
	${sharedBodyStyles}
	display: inline-block;
	font-style: normal;
	font-weight: ${theme.font.weight.medium};
	font-size: 1.1rem;
	line-height: 1.4;
`;
