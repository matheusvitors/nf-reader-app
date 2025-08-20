import { StatusBarStyle } from "react-native"

const primary = '#062460'
const secondary = '#D9ED92'
const accent = '#93938C'
const black = '#141414'
const white = '#fcfcfc'

export const light = {
	name: 'light',
	statusBar: 'dark-content' as StatusBarStyle,

	colors: {
		primary: primary,
		secondary: secondary,
		accent: accent,
		black: black,
		white: white,
	},

	common: {
		background: '#FEFEFE',
		text: black
	},

	semantic: {
		success: '#46B93C',
		attention: '#EDC531',
		warning: '#C92020',
		info: '#3185FC'
	},

	icon: '#EDC531',

	button: {
		background: primary,
		text: white,
		hover: {
			background: secondary,
			text: black,
		}
	},

	card: {
		background: '#e9e9e9ff',
		text: black,
	},

	textInput: {
		background: 'transparent',
		border: primary,
		text: black,
	},
}
