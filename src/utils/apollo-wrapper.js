'use client';

import React from 'react';
import { ApolloLink, HttpLink } from '@apollo/client';
import {
	ApolloNextAppProvider,
	NextSSRInMemoryCache,
	SSRMultipartLink,
	NextSSRApolloClient,
} from '@apollo/experimental-nextjs-app-support/ssr';

function makeClient() {
	const httpLink = new HttpLink({
		uri: 'https://main--spacex-l4uc6p.apollographos.net/graphql',
		headers: {
			Authorization: `Bearer 0591afcf9fb02880221a183e691ba3`,
		},
	});

	return new NextSSRApolloClient({
		cache: new NextSSRInMemoryCache(),
		link:
			typeof window === 'undefined'
				? ApolloLink.from([
						new SSRMultipartLink({
							stripDefer: true,
						}),
						httpLink,
				])
				: httpLink,
	});
}

export const ApolloWrapper = ({ children }) => {
	return (
		<ApolloNextAppProvider makeClient={makeClient}>
			{children}
		</ApolloNextAppProvider>
	);
};
