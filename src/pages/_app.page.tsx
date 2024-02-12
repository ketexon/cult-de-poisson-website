import * as React from "react";

import '@fontsource-variable/grandstander';

import '@fontsource/sniglet/400.css';
import '@fontsource/sniglet/800.css';

import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../styles/Theme";
import { Box } from "@mui/material";

import "../styles/main.css"
import Nav from "../components/Nav";
import "devicon"
import Head from "next/head";
import generateTitle from "~/util/generateTitle";
import Container from "~/components/Container";

import crumpledPaperBackground from "~/assets/backgrounds/crumpled-paper.png"
import { AppProps } from "next/app";
import { NextPage } from "next";
import { origin } from "~/origin";
import Metadata from "~/components/Metadata";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: React.ReactElement) => React.ReactNode
}

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout
}

function DefaultLayout({ children }) {
	return (
		<Box sx={{
			position: "relative",
		}}>
			{/* <Box sx={{
				position: "absolute",
				top: 0, bottom: 0,
				left: 0, right: 0,
				pointerEvents: "none",
				background: `url("${crumpledPaperBackground.src}")`,
				backgroundRepeat: "repeat",
				backgroundSize: "cover",
				opacity: "0.2",
				backgroundBlendMode: "darken"
			}}></Box> */}
			<Nav/>
			<Container component="main">
				{ children }
			</Container>
		</Box>
	)
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)
	// if(Component.layout)

	return (
		<ThemeProvider theme={theme}>
			<Head>
				<meta charSet="utf-8"/>
				<meta property="og:site_name" content="Culte du Poisson"/>
			</Head>
			<Metadata {...{
				title: "Culte du Poisson",
				url: origin,
				type: "website",
				images: [{ src: `${origin}/favicon.png`}]
			}}/>
			<CssBaseline />
			{getLayout(<Component {...pageProps}/>)}
		</ThemeProvider>
	)
}