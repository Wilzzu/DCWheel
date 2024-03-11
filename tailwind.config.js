import tailwindScrollbar from "tailwind-scrollbar";
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			animation: {
				"infinite-rotate": "infiniteRotate 60s linear infinite",
			},
			keyframes: {
				infiniteRotate: {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
			},
			fontFamily: {
				outfit: ["Outfit"],
			},
			colors: {
				darkBlack: "#292929",
				normalBlack: "#333333",
				highlightBlack: "#2E2E2E",
			},
			screens: {
				"2k": "2000px",
			},
			dropShadow: {
				icon: "0 2px 2px rgba(0, 0, 0, 0.5)",
			},
		},
	},

	plugins: [tailwindScrollbar({ nocompatible: true, preferredStrategy: "pseudoelements" })],
};
