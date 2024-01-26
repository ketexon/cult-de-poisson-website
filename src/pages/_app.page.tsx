import * as React from "react";

import '@fontsource-variable/grandstander';

import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../styles/Theme";
import { Box } from "@mui/material";

import "../styles/main.css"
import Nav from "../components/Nav";
import Head from "next/head";
import generateTitle from "~/util/generateTitle";
import Container from "~/components/Container";

import crumpledPaperBackground from "~/assets/backgrounds/crumpled-paper.png"

export default function App({ Component, pageProps }) {
	console.log(Component.maxWidth);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Box sx={{
				height: "100%",
			}}>
				<Box sx={{
					width: "100%",
					height: "100%",
					position: "absolute",
					top: 0,
					left: 0,
					pointerEvents: "none",
					background: `url("${crumpledPaperBackground.src}")`,
					backgroundSize: "cover",
					opacity: "0.2",
					backgroundBlendMode: "darken"
				}}></Box>
				<Nav/>
				<Container component="main">
					<Component {...pageProps} />
				</Container>
			</Box>
		</ThemeProvider>
	)
}