'use client';

// Imports
// ------------
import React from 'react';
import Header from '@parts/Header';
import Hero from '@parts/Hero';
import Form from '@parts/Form';
import PlausibleProvider from 'next-plausible';

// Component
// ------------
const Page = () => {
	return (
		<PlausibleProvider domain="lumina.rs">
			<Header />
			<Hero />
			<Form />
		</PlausibleProvider>
	);
};

export default Page;
