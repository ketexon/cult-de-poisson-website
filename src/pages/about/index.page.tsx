import Head from "next/head";
import generateTitle from "~/util/generateTitle";
import Image from "@/Image"

import srsPitchPhoto from "./srs-pitch.webp"

import members, { Member } from "~/data/members"
import RotateText from "~/components/RotateText";
import { Box, Typography } from "@mui/material";
import Card from "./Card";
import Heading from "~/components/Heading";

export default function About() {
	const letterSpacing = 0.5;

	return <>
		<Head>
			<title>{generateTitle("About")}</title>
		</Head>
		<Heading seed="4">About us</Heading>
		<Typography variant="h1" component="h2">
			Officers
		</Typography>
		<Box sx={{
			display: "grid",
			px: 8,
			my: 2,
			gap: 4,
			gridTemplateColumns: "repeat(2, 1fr)",
			gridAutoRows: "1fr",
		}}>
			{members.map(({ name, description, headshot }) => (
				<Card imageSrc={headshot} name={name} description={description} />
			))}
		</Box>
		<Typography variant="h1" component="h2">
			Who Are We
		</Typography>
		<Typography variant="body1">
			Cult de Poisson is an indie studio formed by UCLA students Nicolette Bond, Maya Balakrish, Anbu V, and Aubrey Clark.
		</Typography>
		<Typography variant="body1">
			We make video games!
		</Typography>
	</>
}