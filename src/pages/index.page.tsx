import Head from "next/head";
import * as React from "react";
import generateTitle from "~/util/generateTitle";
import { NextPageWithLayout } from "./_app.page";
import { Box, Theme, Typography, keyframes, useTheme } from "@mui/material";
import { SxProps } from "@mui/material/styles"

import NextLink from "next/link"

import RotateText, { RotateTextProps } from "~/components/RotateText"

import { Fish, SingleFish } from "./Fish";
import NextImage from "next/image";
import { useRouter } from "next/router";

import CrumpledPaper from "~/assets/backgrounds/crumpled-paper.png"
import Link from "~/components/Link";

type IndexPageFishLinkProps = {
	href?: string,
	color: "primary" | "secondary" | "tertiary" | "background1" | "background2",
	children?: string,
	rotate: number,
	rotateAmplitude?: number,
	rotateInterval?: number,
	translateX?: string,
	translateY?: string,
	flip?: boolean,
	top?: string,
	bottom?: string,
};

function IndexPageFish({ href, children, color: colorKey, rotate, rotateInterval, rotateAmplitude, translateX, translateY, flip, top, bottom }: IndexPageFishLinkProps){
	rotateInterval ??= 500;
	rotateAmplitude ??= 2;

	translateX ??= "0";
	translateY ??= "0";

	flip ??= false;

	const color = {
		primary: "#A5C889",
		secondary: "#E25F5F",
		tertiary: "#D597C8",
		background1: "#9FC4CD",
		background2: "#54A6BA",
	}[colorKey]

	// we have to use effectful functions for animation, since CSS animations cannot transition
	// after the animation ends. Thus, if we want a smooth transition for the rotation effect, we need
	// to do it programmatically
	const fishRef = React.useRef<HTMLDivElement>();

	React.useEffect(() => {
		if(fishRef.current){
			// store the current value in case the ref gets deleted (eg. rerouting)
			const fish = fishRef.current;

			let mouseOver = false;
			let currentRotatePercent = 0.5;
			let currentRotateDuration = rotateInterval / 2;

			const updateRotatePercent = () => fish.style.setProperty("--rotate-percent", `${currentRotatePercent}`);
			const updateRotateDuration = () => fish.style.setProperty("--rotate-duration", `${currentRotateDuration}ms`);

			const reset = () => {
				mouseOver = false;
				currentRotatePercent = 0.5;
				currentRotateDuration = rotateInterval / 2;

				updateRotatePercent();
				updateRotateDuration();
			}

			const onTransitioned = (evt: TransitionEvent) => {
				if(mouseOver && evt.propertyName === "rotate"){
					if(currentRotateDuration !== rotateInterval){
						currentRotateDuration = rotateInterval;
						updateRotateDuration();
					}

					currentRotatePercent = (currentRotatePercent + 1) % 2;
					updateRotatePercent();
				}
			}

			const onMouseEnter = () => {
				mouseOver = true;

				currentRotatePercent = 1;
				updateRotatePercent();
			}

			const onMouseLeave = () => {
				reset();
			}

			fish.addEventListener("mouseenter", onMouseEnter);
			fish.addEventListener("mouseleave", onMouseLeave);
			fish.addEventListener("transitionend", onTransitioned);
			fish.addEventListener("transitioncancel", onTransitioned);

			return () => {
				if(fish){
					reset();

					fish.removeEventListener("mouseenter", onMouseEnter);
					fish.removeEventListener("mouseleave", onMouseLeave);
					fish.removeEventListener("transitionend", onTransitioned);
					fish.removeEventListener("transitioncancel", onTransitioned);
				}
			};
		}
	})

	type WrapperProps = { children?: React.ReactNode, sx?: SxProps<Theme> };
	const Wrapper = href
		? ({ children, sx }: WrapperProps) => <Link href={href} display="block" sx={sx}>{children}</Link>
		: ({ children, sx }: WrapperProps) => <Box sx={sx}>{children}</Box>

	return (
		<Wrapper>
			<SingleFish
				text={children ?? ""}
				ref={fishRef}
				size="large"
				fishColor={color}
				draggable={false}
				flip={flip}
				sx={theme => ({
					position: "absolute",
					left: "50%",
					...top ? { top: top } : {},
					...bottom ? { bottom: bottom } : {},
					translate: `${translateX} ${translateY}`,
					transformOrigin: "center",

					"--rotate-duration": `${rotateInterval}ms`,
					"--rotate-percent": `0.5`,

					"--rotate-min": `${rotate - rotateAmplitude}deg`,
					"--rotate-max": `${rotate + rotateAmplitude}deg`,
					rotate: `calc(
						var(--rotate-min) * var(--rotate-percent)
						+ var(--rotate-max) * (1 - var(--rotate-percent))
					)`,
					transition: theme.transitions.create(['rotate'], {
						duration: `var(--rotate-duration)`,
						easing: theme.transitions.easing.easeInOut,
					}),

				})}
			></SingleFish>
		</Wrapper>
	)
}

const Index: NextPageWithLayout = function () {
	const fishRef = React.useRef<HTMLDivElement>();

	const router = useRouter();

	const rotateAmount = -25;
	const rotateTextOptions: Partial<RotateTextProps> = {
		rotateCenter: -rotateAmount,
	}

	return <>
		<Head>
			<title>{generateTitle()}</title>
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
		})}>
			<Box sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "stretch",
				rotate: "-25deg"
			}}>
				<Box flexGrow={1} flexBasis={0} position="relative">
					<IndexPageFish
						href="/about"
						color="primary"
						rotate={40}
						bottom="14rem"
						translateX="-100%"
					>
						ABOUT US
					</IndexPageFish>
					<IndexPageFish
						href="/projects"
						color="secondary"
						rotate={-20}
						bottom="2rem"
						translateX="30%"
						flip
					>
						PROJECTS
					</IndexPageFish>
					{/* <IndexPageFish
						color="background1"
						rotate={-20}
						bottom="2rem"
						translateX="30%"
						flip
					>
					</IndexPageFish> */}
				</Box>
				<Typography
					variant="h1" color="primary"
					fontSize="5rem"
					textAlign="center"
					sx={theme => ({
						whiteSpace: "nowrap",
						lineHeight: 0.8,
						[theme.breakpoints.up("lg")]: {
							"& > .line-break": {
								display: "none",
							}
						},
						pointerEvents: "none",
					})}
				>
					<RotateText {...rotateTextOptions} letterSpacing="0.5em">CULT </RotateText><br className="line-break"/>
					<RotateText {...rotateTextOptions} letterSpacing="0.25em" typographyProps={{ fontSize: "0.75em"}} lineHeight={1.5}>de</RotateText><br className="line-break"/>
					<RotateText {...rotateTextOptions} letterSpacing="0.5em"> POISSON</RotateText>
				</Typography>
				<Box flexGrow={1} flexBasis={0} position="relative">
					<IndexPageFish
						href="/devlogs"
						color="tertiary"
						rotate={40}
						top="8rem"
						translateX="-10%"
						flip
					>
						DEVLOGS
					</IndexPageFish>
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