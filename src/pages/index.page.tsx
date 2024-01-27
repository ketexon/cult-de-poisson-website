import Head from "next/head";
import * as React from "react";
import generateTitle from "~/util/generateTitle";
import { NextPageWithLayout } from "./_app.page";
import { Box } from "@mui/material";

import Fish from "./Fish";
import Image from "~/components/Image";

const Index: NextPageWithLayout = function(){
	const scaleAmount = 0.1;
	return <>
		<Head>
			<title>{generateTitle()}</title>
		</Head>
		<Box sx={theme => ({
			height: "100%",
			"& #DEVLOGS": {
				cursor: "pointer",
				transition: theme.transitions.create("transform", {
					duration: theme.transitions.duration.short,
					easing: theme.transitions.easing.easeOut
				}),
				"&:hover": {
					transform: `
						scale(${1 + scaleAmount})
						translateX(${-scaleAmount * 50}rem)
						translateY(${-scaleAmount * 43}rem)
					`
				},
			}
		})}>
			<Fish style={{
				width: "100%",
				height: "100%",
			}}/>
		</Box>
	</>
}

Index.getLayout = (page) => <Box height="100%">{page}</Box>

export default Index;