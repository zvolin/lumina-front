// Imports
// ------------
import React from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlobalContext } from '@parts/Contexts';

// Component
// ------------
const SmoothScroll = ({ children }) => {
	// NOTE • Lenis smooth scrolling
	const lenis = React.useRef();
	const contentRef = React.useRef();

	// NOTE • ScrollProxy Global Reference
	const { scrollProxy } = React.useContext(GlobalContext);

	// NOTE • Activate & Destroy Lenis smooth scrolling
	React.useLayoutEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		lenis.current = new Lenis({
			lerp: 0.1,
			wrapper: scrollProxy.current,
			content: contentRef.current,

			// easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
			// duration: 1.2,
		});

		const scrollFn = (time) => {
			lenis.current.raf(time);
			requestAnimationFrame(scrollFn);
		};

		gsap.ticker.add((time) => {
			lenis.current.raf(time * 1000);
		});

		// Gsap scrollerProxy for lenis
		ScrollTrigger.scrollerProxy(scrollProxy.current, {
			scrollTop(value) {
				if (arguments.length) {
					lenis.current.scrollTo(value, {
						immediate: true,
					});
				}
				return lenis.current.scroll; // getter
			},
			getBoundingClientRect() {
				return {
					top: 0,
					left: 0,
					width: window.innerWidth,
					height: window.innerHeight,
				};
			},
		});

		// Cleanup
		return () => {
			lenis.current.destroy();
		};
	}, []);

	return (
		<div ref={scrollProxy} className="lenis-wrapper">
			<div ref={contentRef} className="lenis-content">
				{children}
			</div>
		</div>
	);
};

export default SmoothScroll;
