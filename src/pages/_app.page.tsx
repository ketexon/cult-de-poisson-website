import * as React from "react";

import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../styles/Theme";
import { Box } from "@mui/material";

import "../styles/main.css"
import SideNav from "../components/SideNav";
import Head from "next/head";
import generateTitle from "~/util/generateTitle";

export default function App({ Component, pageProps }) {
	const sidenavPercent = 1/3;
	const contentPercent = 1 - sidenavPercent;
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Box sx={{
				display: "grid",
				gridTemplateColumns: `${sidenavPercent}fr  ${contentPercent}1fr`,
				"--sidenav-percent": `${sidenavPercent}`,
				height: "100%",
			}}>
				<SideNav/>
				{/* Scroll container */}
				<Box component="main"
					sx={theme => ({
						overflow: "scroll",
						height: "100%"
					})}
				>
					{/* Maxwidth container */}
					<Box sx={{
						maxWidth: theme.breakpoints.values.lg * contentPercent,
						px: 2,
						py: 8,
					}}>
						<Component {...pageProps} />
					</Box>
				</Box>
			</Box>
		</ThemeProvider>
	)
}