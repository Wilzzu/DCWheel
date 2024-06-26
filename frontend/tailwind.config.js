import tailwindScrollbar from "tailwind-scrollbar";
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			animation: {
				"infinite-rotate": "infiniteRotate 60s linear infinite",
				"point-right": "pointRight 5s ease-in-out infinite 3s",
				"point-down": "pointDown 5s ease-in-out infinite 3s",
			},
			keyframes: {
				infiniteRotate: {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
				pointRight: {
					"0%, 30%": { transform: "translateX(0px)" },
					"15%": { transform: "translateX(10px)" },
				},
				pointDown: {
					"0%, 30%, 100%": { transform: "translateY(0px) rotate(90deg)" },
					"15%": { transform: "translateY(10px) rotate(90deg)" },
				},
			},
			fontFamily: {
				outfit: [
					"Outfit",
					"ui-sans-serif",
					"system-ui",
					"sans-serif",
					"Apple Color Emoji",
					"Segoe UI Emoji",
					"Segoe UI Symbol",
					"Noto Color Emoji",
				],
			},
			colors: {
				darkBlack: "#212121",
				normalBlack: "#292929",
				highlightBlack: "#2E2E2E",
			},
			screens: {
				"2k": "2000px",
			},
			boxShadow: {
				"3xl": "0 10px 45px -14px rgba(0, 0, 0, 0.3)",
				middle: "0 2px 35px -14px rgba(0, 0, 0, 0.3)",
				wheelBtn: "0 5px 30px rgba(0, 0, 0, 0.3)",
			},
			dropShadow: {
				icon: "0 2px 2px rgba(0, 0, 0, 0.5)",
				button: "0 2px 2px rgba(0, 0, 0, 0.3)",
				"3xl": "0 2px 3px rgba(0, 0, 0, 1)",
				wheel: "2px 2px 16px rgba(0, 0, 0, 0.3)",
				text: "0 1px 1px rgba(0, 0, 0, 0.5)",
			},
		},
	},

	plugins: [tailwindScrollbar({ nocompatible: true, preferredStrategy: "pseudoelements" })],
};
