'use client';

// Imports
// ------------
import React from 'react';
import Header from '@parts/Header';
import Hero from '@parts/Hero';
import Form from '@parts/Form';
// import { useSuspenseQuery } from '@apollo/experimental-nextjs-app-support/ssr';
// import { gql } from '@apollo/client';

// GraphQL
// ------------
// Tells the age how to cache content
// export const dynamic = 'force-dynamic';

// const query = gql`
// 	query {
// 		launchLatest {
// 			mission_name
// 		}
// 	}
// `;

// Component
// ------------
const Page = () => {
	return (
		<>
			<Header />
			<Hero />
			<Form />
		</>
	);
};

export default Page;
