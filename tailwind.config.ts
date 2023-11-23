import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: colors.black,
			white: colors.white,
			primary: colors.violet[600],
			hover: colors.violet[500],
			card: colors.zinc[900],
			foreground: colors.zinc[800],
			separator: colors.zinc[600],
			light: colors.zinc[300],
			open: colors.green[600],
			closed: colors.red[600],
		},
	},
	plugins: [],
}
export default config
