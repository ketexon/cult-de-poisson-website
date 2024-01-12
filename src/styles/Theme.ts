import { createTheme } from "@mui/material/styles";

export default createTheme({
	typography: {
		h1: {
			fontSize: "2rem",
			fontWeight: "bold",
		},
		h2: {
			fontSize: "1.75rem",
			fontWeight: "normal",
		},
		h3: {
			fontSize: "1.5rem",
			fontWeight: "bold",
		},
		h4: {
			fontSize: "1.5rem",
			fontWeight: "normal",
		},
		h5: {
			fontSize: "1.25rem",
			fontWeight: "bold",
		},
		h6: {
			fontSize: "1.25rem",
			fontStyle: "italic"
		},
		body1: {
			fontSize: "1rem",
			lineHeight: 1.15,
		},
		subtitle1: {
			fontStyle: "italic",
			color: "GrayText"
		},
	},
	palette: {
		primary: {
			light: "#88af36",
			main: "#1a4913",
		},
		secondary: {
			main: "#1a4913",
		},
		background: {
			default: "#ffffe4"
		}
	}
})