/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js}'],
	theme: {
		color: '#ffffffde',
		extend: {
			colors: {
				primary: '#ffffffde',
				thead: '#1e1f26',
				tbody: '#263238',
				bg: '#16171c',
			},
		},
	},
}
