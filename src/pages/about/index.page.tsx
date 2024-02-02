import Head from "next/head";
import generateTitle from "~/util/generateTitle";
import Image from "@/Image"

import srsPitchPhoto from "./srs-pitch.webp"

import members, { Member } from "~/data/members"
import RotateText from "~/components/RotateText";
import { Box, Typography } from "@mui/material";
import Card from "./Card";

export default function About() {
	const letterSpacing = 0.5;

	return <>
		<Head>
			<title>{generateTitle("About")}</title>
		</Head>
		<Typography
			variant="h1"
			fontFamily="sniglet" fontWeight={800}
			color="primary"
			fontSize="4rem"
			letterSpacing={`${letterSpacing}rem`}
			textAlign="center"
			sx={{
				"& > *": {
					pl: `${letterSpacing}rem`
				}
			}}
		>
			<RotateText seed="4">ABOUT US</RotateText>
		</Typography>
		<Typography variant="body1">
			Cult de Poisson is an indie studio formed by UCLA students Nicolette Bond, Maya Balakrish, Anbu V, and Aubrey Clark.
		</Typography>
		<Box sx={{
			display: "grid",
			p: 8,
			gap: 4,
			gridTemplateColumns: "repeat(2, 1fr)",
			gridAutoRows: "1fr",
		}}>
			{members.map(({ name, description, headshot }) => (
				<Card imageSrc={headshot} name={name} description={description} />
			))}
		</Box>
	</>
}