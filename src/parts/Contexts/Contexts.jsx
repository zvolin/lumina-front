'use client';

// Imports
// ------------
import React from 'react';
import { GlobalContext } from './';

// Component
// ------------
const Contexts = ({ children }) => {
	// NOTE • States
	const [isLoaded, setIsLoaded] = React.useState(false);

	// NOTE • Refs
	const scrollProxy = React.useRef();

	return (
		<GlobalContext.Provider value={{ isLoaded, setIsLoaded, scrollProxy }}>
			{children}
		</GlobalContext.Provider>
	);
};

export default Contexts;
