import Head from "next/head";
import generateTitle from "~/util/generateTitle";
import Image from "@/Image"

import srsPitchPhoto from "./srs-pitch.webp"

import members, { Member } from "~/data/members"
import RotateText from "~/components/RotateText";
import { Box, Typography } from "@mui/material";
import Card from "./Card";
import Heading from "~/components/Heading";
import Metadata from "~/components/Metadata";
import { origin } from "~/origin";

export default function About() {
	const letterSpacing = 0.5;

	return <>
		<Head>
			<title>{generateTitle("About")}</title>
		</Head>
		<Metadata {...{
			title: "About Culte du Poisson",
			url: `${origin}/about`,
		}}/>
		<Heading seed="4">About us</Heading>
		<Typography variant="h1" component="h2">
			Who Are We
		</Typography>
		<Box color="white">
			<Typography variant="body1">
				Culte du Poisson is a UCLA club formed by UCLA students Nicolette Bond, Maya Balakrishnan, Anbu V, and Aubrey Clark that creates 3D indie video games! :3
			</Typography>
		</Box>
		<Typography variant="h1" component="h2">
			Projects
		</Typography>
		<Box color="white">
			<Typography variant="body1" color="white">
				We are working on a project where you, just an average, everyday fisherman
				in a peculiar new world, must rethink your craft
				when the line you cast ripples the world in ways you never initially intended.
			</Typography>
		</Box>
		<Typography variant="h1" component="h2">
			Officers
		</Typography>
		<Box sx={theme => ({
			display: "grid",
			px: 8,
			my: 2,
			gap: 4,
			gridTemplateColumns: "repeat(2, 1fr)",
			gridAutoRows: "1fr",
			[theme.breakpoints.down("md")]: {
				gridTemplateColumns: "1fr",
				px: 0,
			},
			justifyItems: "center"
		})}>
			{members.map(({ name, description, headshot, links }) => (
				<Card imageSrc={headshot} name={name} description={description} links={links} key={name} />
			))}
		</Box>
	</>
}