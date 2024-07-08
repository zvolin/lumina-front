'use client';

// Imports
// ------------
import React from 'react';
import StyledComponentsRegistry from '@utils/registry';
import Contexts from '@parts/Contexts/Contexts';
import SmoothScroll from '@parts/SmoothScroll';
import GridExposer from '@parts/GridExposer';
import WebglBackground from '@parts/Webgl/Background';
import localFont from 'next/font/local';
import { ApolloWrapper } from '@utils/apollo-wrapper';
import { ThemeProvider } from 'styled-components';
import { theme } from '@theme';
import { useHeightFix } from "@utils/useHeightFix";

// Fonts
// ------------
export const splineSans = localFont({
	fontFamily: 'Spline Sans Mono',
	variable: '--spline-sans-mono',
	src: [
		{
			path: './fonts/SplineSansMono-Regular.woff2',
			weight: '400',
			style: 'normal',
			subsets: ['latin'],
		},
		{
			path: './fonts/SplineSansMono-Medium.woff2',
			weight: '500',
			style: 'normal',
			subsets: ['latin'],
		},
	],
	display: 'swap',
});

export const inter = localFont({
	fontFamily: 'Inter',
	variable: '--inter',
	src: [
		{
			path: './fonts/Inter-Regular.woff2',
			weight: 'normal',
			style: 'normal',
			subsets: ['latin'],
		},
		{
			path: './fonts/Inter-Bold.woff2',
			weight: 'bold',
			style: 'normal',
			subsets: ['latin'],
		},
	],
	display: 'swap',
});

// Styls
// ------------
import '@/css/global.css';

// Component
// ------------
const RootLayout = ({ children }) => {
	useHeightFix();

	return (
		<html lang="en">
			<body className={`${splineSans.variable} ${inter.variable}`}>
				<StyledComponentsRegistry>
					<ApolloWrapper>
						<ThemeProvider theme={theme} key="themeprovider">
							{/* <GridExposer /> */}
							<Contexts>
								<SmoothScroll>
									{children}
								</SmoothScroll>

								<WebglBackground />
							</Contexts>
						</ThemeProvider>
					</ApolloWrapper>
				</StyledComponentsRegistry>
			</body>
		</html>
	)
}

export default RootLayout;
