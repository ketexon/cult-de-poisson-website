import Head from "next/head";
import * as React from "react";
import generateTitle from "~/util/generateTitle";
import { NextPageWithLayout } from "./_app.page";
import { Box, Theme, Typography, keyframes, useTheme } from "@mui/material";
import { SxProps } from "@mui/material/styles"

import NextLink from "next/link"

import RotateText, { RotateTextProps } from "~/components/RotateText"

import { HomePageFish, HomePageFishProps } from "./HomePageFish";
import NextImage from "next/image";
import { useRouter } from "next/router";

import CrumpledPaper from "~/assets/backgrounds/crumpled-paper.png"

type FishPosition = {
	text?: string,
} & Pick<
		HomePageFishProps,
		"href" | "color" |
		"rotate" | "translateX" | "translateY" |
		"top" | "bottom" |
		"size" | "flipX" | "flipY"
	>

const fishTranslateXOffset = "20%";

const topFishPositionsLarge: FishPosition[] = [
	{
		text: "ABOUT US",
		href: "/about",
		color: "primary",
		rotate: 45,
		bottom: "16rem", translateX: "-100%",
	},
	// {
	// 	text: "PROJECTS",
	// 	href: "/projects",
	// 	color: "secondary",
	// 	rotate: -20,
	// 	bottom: "0rem", translateX: "30%",
	// 	flipX: true, flipY: true,
	// },
	{
		color: "background2",
		rotate: -20,
		bottom: "0rem", translateX: "30%",
		flipX: true, flipY: true,
	},

	{
		color: "background1",
		size: "medium",

		rotate: -40,
		bottom: "6rem",
		translateX: "-35%",
	},

	{
		color: "background2",
		size: "medium",

		rotate: 0,
		bottom: "0rem",
		translateX: "-140%",
		flipX: true, flipY: true,
	},

	{
		color: "background1",
		size: "large",

		rotate: -60,
		bottom: "6rem",
		translateX: "-180%",
	},

	{
		color: "background2",
		size: "medium",

		rotate: -80,
		bottom: "34rem",
		translateX: "-170%",
	},

	{
		color: "background2",
		size: "medium",

		rotate: 75,
		bottom: "21rem",
		translateX: "-40%",
	},

	{
		color: "background1",
		size: "medium",

		rotate: 40,
		bottom: "5rem",
		translateX: "150%",
		flipX: true,
	},
]

const topFishPositionsSmall: FishPosition[] = [
	{
		text: "ABOUT US",
		href: "/about",
		color: "primary",
		rotate: 50,
		bottom: "16rem", translateX: "-40%",
	},
	// {
	// 	text: "PROJECTS",
	// 	href: "/projects",
	// 	color: "secondary",
	// 	rotate: -20,
	// 	bottom: "0rem", translateX: "-30%",
	// 	flipX: true, flipY: true,
	// },
	{
		color: "background2",
		rotate: -20,
		bottom: "0rem", translateX: "-30%",
		flipX: true, flipY: true,
	},

	{
		color: "background1",
		size: "medium",

		rotate: -40,
		bottom: "6rem",
		translateX: "-100%",
	},

	{
		color: "background2",
		size: "medium",

		rotate: 50,
		bottom: "16rem",
		translateX: "50%",
		flipX: true, flipY: true,
	},

	// {
	// 	color: "background1",
	// 	size: "large",

	// 	rotate: -60,
	// 	bottom: "6rem",
	// 	translateX: "-180%",
	// },

	// {
	// 	color: "background2",
	// 	size: "medium",

	// 	rotate: -80,
	// 	bottom: "34rem",
	// 	translateX: "-170%",
	// },

	// {
	// 	color: "background2",
	// 	size: "medium",

	// 	rotate: 75,
	// 	bottom: "21rem",
	// 	translateX: "-40%",
	// },

	// {
	// 	color: "background1",
	// 	size: "medium",

	// 	rotate: 40,
	// 	bottom: "5rem",
	// 	translateX: "150%",
	// 	flipX: true,
	// },
]

const bottomFishPositionsLarge: FishPosition[] = [
	{
		text: "DEVLOGS",
		href: "/devlog",
		color: "tertiary",
		rotate: 40,
		top: "8rem",
		translateX: "-10%",
		flipX: true,
	},

	{
		color: "background1",
		size: "small",
		rotate: -30,
		top: "1rem",
		translateX: "-320%",
	},

	{
		color: "background2",
		size: "large",
		rotate: -30,
		top: "6rem",
		translateX: "-190%",
		flipX: true,
	},

	{
		color: "background1",
		size: "small",
		rotate: -10,
		top: "1rem",
		translateX: "-110%",
	},

	{
		color: "background1",
		size: "small",
		rotate: 50,
		top: "5rem",
		translateX: "70%",
		flipY: true,
	},

	{
		color: "background2",
		size: "small",
		rotate: 70,
		top: "4rem",
		translateX: "150%",
		flipX: true,
	},

	{
		color: "background2",
		size: "small",
		rotate: -10,
		top: "22rem",
		translateX: "95%",
		flipX: true,
	},

	{
		color: "background1",
		size: "small",
		rotate: 90,
		top: "22rem",
		translateX: "-40%",
		flipX: true,
		flipY: true,
	},

	{
		color: "background1",
		size: "small",
		rotate: 50,
		top: "16rem",
		translateX: "-140%",
	},
]

const bottomFishPositionsSmall: FishPosition[] = [
	{
		text: "DEVLOGS",
		href: "/devlog",
		color: "tertiary",
		rotate: 40,
		top: "4rem",
		translateX: "-100%",
		flipX: true,
	},

	{
		color: "background1",
		size: "small",
		rotate: -30,
		top: "1rem",
		translateX: "0%",
	},

	{
		color: "background2",
		size: "large",
		rotate: -30,
		top: "6rem",
		translateX: "-190%",
		flipX: true,
	},

	{
		color: "background1",
		size: "small",
		rotate: 50,
		top: "16rem",
		translateX: "-150%",
	},

	// {
	// 	color: "background1",
	// 	size: "small",
	// 	rotate: 50,
	// 	top: "5rem",
	// 	translateX: "70%",
	// 	flipY: true,
	// },

	// {
	// 	color: "background2",
	// 	size: "small",
	// 	rotate: 70,
	// 	top: "4rem",
	// 	translateX: "150%",
	// 	flipX: true,
	// },

	// {
	// 	color: "background2",
	// 	size: "small",
	// 	rotate: -10,
	// 	top: "22rem",
	// 	translateX: "95%",
	// 	flipX: true,
	// },

	// {
	// 	color: "background1",
	// 	size: "small",
	// 	rotate: 90,
	// 	top: "22rem",
	// 	translateX: "-40%",
	// 	flipX: true,
	// 	flipY: true,
	// },

	// {
	// 	color: "background1",
	// 	size: "small",
	// 	rotate: 50,
	// 	top: "16rem",
	// 	translateX: "-140%",
	// },
]

const Index: NextPageWithLayout = function () {
	const rotateAmount = -25;
	const rotateTextOptions: Partial<RotateTextProps> = {
		rotateCenter: -rotateAmount,
	}

	return <>
		<Head>
			<title>{generateTitle()}</title>
			<meta property="og:type" content="website"/>
		</Head>
		<Box sx={theme => ({
			height: "100%",
			backgroundColor: "background",

			overflow: "clip",

			display: "grid",
			"& > *": {
				gridRowStart: 1,
				gridColumnStart: 1,
			},
			minWidth: 0,
		})}>
			<Box sx={theme => ({
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "stretch",
				rotate: `${rotateAmount}deg`,
				transformOrigin: "50% 50%",
				translate: "0 02rem",
				[theme.breakpoints.down("lg")]: {
					scale: "0.8",
				},
			})}>
				{/* LARGE */}
				<Box flexGrow={1} flexBasis={0} position="relative" sx={theme => ({
					[theme.breakpoints.down("lg")]: {
						display: "none",
					}
				})}>
					{
						topFishPositionsLarge.map(({text, translateX, ...fishProps},i ) => (
							<HomePageFish
								rotatable={fishProps.href !== undefined}
								translateX={`calc(${translateX ?? "0px"} + ${fishTranslateXOffset})`}
								{ ...fishProps }
								key={i} /* using key as index is only ok because data is constant  */
								children={text}
							/>
						))
					}
				</Box>
				{/* SMALL */}
				<Box flexGrow={1} flexBasis={0} position="relative" sx={theme => ({
					[theme.breakpoints.up("lg")]: {
						display: "none",
					}
				})}>
					{
						topFishPositionsSmall.map(({text, translateX, ...fishProps},i ) => (
							<HomePageFish
								rotatable={fishProps.href !== undefined}
								translateX={`calc(${translateX ?? "0px"} + ${fishTranslateXOffset})`}
								{ ...fishProps }
								key={i} /* using key as index is only ok because data is constant  */
								children={text}
							/>
						))
					}
				</Box>
				<Typography
					variant="h1" color="primary"
					fontSize="3rem"
					textAlign="center"
					sx={theme => ({
						display: "block",
						whiteSpace: "nowrap",
						lineHeight: 0.8,
						[theme.breakpoints.up("lg")]: {
							"& > .line-break": {
								display: "none",
							},
							fontSize: "5rem"
						},
						pointerEvents: "none",
						userSelect: "none",
						marginLeft: "-24rem",
						marginRight: "-24rem"
					})}
				>
					<RotateText {...rotateTextOptions} letterSpacing="0.5em">CULTE </RotateText><br className="line-break"/>
					<RotateText {...rotateTextOptions} letterSpacing="0.25em" typographyProps={{ fontSize: "0.75em"}} lineHeight={1.5}>du</RotateText><br className="line-break"/>
					<RotateText {...rotateTextOptions} letterSpacing="0.5em"> POISSON</RotateText>
				</Typography>
				{/* BOTTOM FISH LARGE */}
				<Box flexGrow={1} flexBasis={0} position="relative" sx={theme => ({
					[theme.breakpoints.down("lg")]: {
						display: "none",
					}
				})}>
					{
						bottomFishPositionsLarge.map(({text, translateX, ...fishProps},i ) => (
							<HomePageFish
								rotatable={fishProps.href !== undefined}
								translateX={`calc(${translateX ?? "0px"} + ${fishTranslateXOffset})`}
								{ ...fishProps }
								key={i} /* using key as index is only ok because data is constant  */
								children={text}
							/>
						))
					}
				</Box>
				{/* BOTTOM FISH SMALL */}
				<Box flexGrow={1} flexBasis={0} position="relative" sx={theme => ({
					[theme.breakpoints.up("lg")]: {
						display: "none",
					}
				})}>
					{
						bottomFishPositionsSmall.map(({text, translateX, ...fishProps},i ) => (
							<HomePageFish
								rotatable={fishProps.href !== undefined}
								translateX={`calc(${translateX ?? "0px"} + ${fishTranslateXOffset})`}
								{ ...fishProps }
								key={i} /* using key as index is only ok because data is constant  */
								children={text}
							/>
						))
					}
				</Box>
			</Box>
			<Box sx={{
				maxWidth: "100%",
				maxHeight: "100%",
				overflow: "clip",
			}}>
				<NextImage src={CrumpledPaper} alt="" style={{
					width: "100%",
					height: "100%",
					opacity: 0.5,
					mixBlendMode: "multiply",
					pointerEvents: "none",
				}}/>
			</Box>
		</Box>
	</>
}

Index.getLayout = (page) => <Box height="100%">{page}</Box>

export default Index;