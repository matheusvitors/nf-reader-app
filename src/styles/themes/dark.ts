import { StatusBarStyle } from "react-native"

const primary = '#194bf1ff'
const secondary = '#D9ED92'
const accent = '#93938C'
const black = '#0d0d0d'
const white = '#fcfcfc'

export const dark = {
	name: 'dark',
	statusBar: 'light-content' as StatusBarStyle,

	colors: {
		primary: primary,
		secondary: secondary,
		accent: accent,
		black: black,
		white: white,
	},

	common: {
		background: black,
		text: white
	},

	semantic: {
		success: '#46B93C',
		attention: '#f8fc01',
		warning: '#f71919ff',
		info: accent
	},

	icon: '#6a00b1ff',

	button: {
		background: primary,
		text: white,
		hover: {
			background: secondary,
			text: black,
		}
	},

	card: {
		background: '#0b0f31ff',
		text: white,
	},

	textInput: {
		background: 'transparent',
		border: white,
		text: white,
	},
}
