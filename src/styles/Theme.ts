import { createTheme } from "@mui/material/styles";

export default createTheme({
	typography: {
		h1: {
			fontSize: "2rem",
			fontWeight: "black",
			fontFamily: "Grandstander Variable"
		},
		h2: {
			fontSize: "1.75rem",
			fontFamily: "Grandstander Variable",
			fontWeight: "semibold",
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
			light: "#FFDB7E",
			main: "#FF9900",
		},
		secondary: {
			main: "#5769C8",
			light: "#C5D8DE",
		},
		background: {
			default: "#F6F2EB"
		}
	},
	components: {
		MuiButtonBase: {
			defaultProps: {
				disableRipple: true,
				disableTouchRipple: true,
			}
		}
	}
})