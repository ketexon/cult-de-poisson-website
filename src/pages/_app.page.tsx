import * as React from "react";

/* STYLESHEETs */
import '@fontsource-variable/grandstander';

import '@fontsource/sniglet/400.css';
import '@fontsource/sniglet/800.css';

import "devicon"
import "../styles/main.css"

import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../styles/Theme";
import { Box } from "@mui/material";

import Nav from "../components/Nav";
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
			<Nav/>
			<Container component="main">
				{ children }
			</Container>
		</Box>
	)
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => <DefaultLayout>{page}</DefaultLayout>)

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