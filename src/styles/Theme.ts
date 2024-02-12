import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import createPalette from "@mui/material/styles/createPalette";

const primary = "#FF9900";

export default responsiveFontSizes(createTheme({
	typography: {
		h1: {
			fontSize: "3rem",
			fontWeight: 800,
			fontFamily: "Sniglet",
			color: primary
		},
		h2: {
			fontSize: "2.25rem",
			fontFamily: "Sniglet",
			fontWeight: 400,
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
			fontSize: "1.25rem",
			lineHeight: 1.5,
			marginBottom: "1rem",
			fontFamily: "Sniglet",
		},
		body2: {
			fontSize: "1rem",
			lineHeight: 1.15,
			fontFamily: "Sniglet",
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
			default: "#134250",
			paper: "#EFEAE3",
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
}), {

})