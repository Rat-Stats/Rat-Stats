/** @type {import('tailwindcss').Config} */

module.exports = {
	content: [
		'./Client/**/*.{js,jsx,ts,tsx}', // all files with this extension are covered
	],
	plugins: [require('daisyui')],
	daisyui: {
		themes: ['halloween'],
	},
};
