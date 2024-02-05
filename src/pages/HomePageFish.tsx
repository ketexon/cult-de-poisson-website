import { Box, BoxProps, SxProps, Theme, Typography } from "@mui/material";
import React from "react";
import Image from "~/components/Image";

import Link from "~/components/Link";

import RotateText from "~/components/RotateText"

export type SingleFishProps = Omit<BoxProps, "ref"> & {
	fishColor?: string,
	text?: string,
	svgProps?: React.SVGProps<SVGSVGElement>,
	letterSpacing?: number,
	size?: "small" | "medium" | "large",
	flipX?: boolean,
	flipY?: boolean,
}

export const SingleFish = React.forwardRef<HTMLDivElement, SingleFishProps>(
	({fishColor, text, svgProps, letterSpacing, size, draggable, flipX, flipY, ...boxProps}, ref) => {
		size ??= "medium";
		fishColor ??= "#9FC4CD";
		letterSpacing ??= 0.15;
		flipX ??= false;
		flipY ??= false;

		const fishSizeMult = 0.8 * (
			size === "large"
				? 425/352
			: size === "small"
				? 352/425
				: 1
		);

		const fishWidth = 352 * fishSizeMult;
		const fishHeight = 191 * fishSizeMult;

		return (
			<Box ref={ref} draggable={false} {...boxProps} sx={[
				{
					width: "fit-content",
					display: "grid",
					"& > *": {
						gridRow: 1,
						gridColumn: 1,
					},
					userSelect: "none",
				},
				...[boxProps.sx ?? []].flat()
			]}>
				<svg width={fishWidth} height={fishHeight} viewBox="0 0 352 191" fill="none" xmlns="http://www.w3.org/2000/svg"{...svgProps}>
					<g style={{
						transformOrigin: "50% 50%",
						transform: `scale(
							${flipX ? -1 : 1},
							${flipY ? -1 : 1}
						)`
					}}>
						<path fill={fishColor} d="M47.1353 97.8361C47.1353 139.088 147.15 177.68 208.781 177.68C270.413 177.68 360.034 133.604 351.008 107.36C348 94.9113 281.353 23.1421 219.722 23.1421C124.813 23.1421 47.1353 56.5838 47.1353 97.8361Z"/>
						<path fill={fishColor} d="M36.303 3.86033C29.0794 -4.68956 15.5602 3.64674 16.8064 15.8824L24.6396 92.7883C24.835 94.7071 24.6347 96.6954 24.0542 98.599L0.893362 174.545C-2.84686 186.809 9.19536 195.621 18.0736 187.117L74.0984 133.45C75.4304 132.174 76.9663 131.227 78.5944 130.678L147.072 107.573C157.924 103.911 159.39 86.7694 149.164 83.1169L85.8407 60.4999C84.2535 59.933 82.8386 58.9406 81.7058 57.5998L36.303 3.86033Z"/>
						{
							!text && <>
								<ellipse cx="16.1373" cy="19.8511" rx="16.1373" ry="19.8511" transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 309.982 71.3594)" fill="#F6F2EB"/>
								<ellipse cx="9.84647" cy="12.1125" rx="9.84647" ry="12.1125" transform="matrix(-1 -8.74228e-08 -8.74228e-08 1 297.4 78.7612)" fill="#242424"/>
							</>
						}
					</g>
				</svg>
				<Box sx={{
					[flipY ? "pb" : "pt"]: 2 * fishSizeMult,
					[flipX ? "pr" : "pl"]: 3 * fishSizeMult,
					width: "100%",
					height: "100%",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}>
					<Typography
						variant="h1" component="h2"
						fontWeight={400} fontSize={"3rem"}
						letterSpacing={`${letterSpacing * fishSizeMult}em`}
						sx={theme => ({
							color: theme.palette.primary.contrastText,
							opacity: 0.8,
							mixBlendMode: "darken",
						})}
					>
						<RotateText animate={false}>{text}</RotateText>
					</Typography>
				</Box>
			</Box>
		)
	}
)

export type HomePageFishProps = {
	href?: string,
	color: "primary" | "secondary" | "tertiary" | "background1" | "background2",
	children?: string,
	rotate: number,
	rotatable?: boolean,
	rotateAmplitude?: number,
	rotateInterval?: number,
	translateX?: string,
	translateY?: string,
	top?: string,
	bottom?: string,
} & Pick<SingleFishProps, "size" | "flipX" | "flipY">;

export function HomePageFish(props: HomePageFishProps){
	let {
		href,
		children, color: colorKey,
		rotate, rotatable, rotateInterval, rotateAmplitude,
		translateX, translateY,
		top, bottom,
		...singleFishProps
	} = props;
	rotatable ??= false;

	rotateInterval ??= 500;
	rotateAmplitude ??= 2;

	translateX ??= "0";
	translateY ??= "0";

	const color = {
		primary: "#A5C889",
		secondary: "#E25F5F",
		tertiary: "#D597C8",
		background1: "#54A6BA",
		background2: "#9FC4CD",
	}[colorKey]

	// we have to use effectful functions for animation, since CSS animations cannot transition
	// after the animation ends (eg. if we rotate back and forth, if we stop hovering, it will snap back to
	// its original value). Thus, if we want a smooth transition for the rotation effect, we need
	// to do it programmatically
	const fishRef = React.useRef<HTMLDivElement>();

	React.useEffect(() => {
		if(fishRef.current && rotatable){
			// store the current value in case the ref gets deleted (eg. rerouting)
			const fish = fishRef.current;

			let mouseOver = false;
			let currentRotatePercent = 0.5;
			let currentRotateDuration = rotateInterval / 2;

			const updateRotatePercent = () => fish.style.setProperty("--rotate-percent", `${currentRotatePercent}`);
			const updateRotateDuration = () => fish.style.setProperty("--rotate-duration", `${currentRotateDuration}ms`);

			// resets all the state to its initial values
			const reset = () => {
				mouseOver = false;
				currentRotatePercent = 0.5;
				currentRotateDuration = rotateInterval / 2;

				updateRotatePercent();
				updateRotateDuration();
			}

			// once rotation transition ends, rotate opposite direction
			const onTransitioned = (evt: TransitionEvent) => {
				if(mouseOver && evt.propertyName === "rotate"){
					// the first transition should have half the transition duration
					// (since it goes from the middle to the end, instead of
					// end to end)
					// ensure the duration is the full duration after the first transition
					if(currentRotateDuration !== rotateInterval){
						currentRotateDuration = rotateInterval;
						updateRotateDuration();
					}

					// alternates between 0 and 1
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


	type WrapperProps = { children?: React.ReactNode };
	// wrapper so that if there is no href, we will not use Link (since it throws an error)
	const Wrapper = href
		? ({ children }: WrapperProps) => <Link href={href} display="block">{children}</Link>
		: ({ children }: WrapperProps) => <Box>{children}</Box>

	return (
		<Wrapper>
			<SingleFish
				text={children ?? ""}
				ref={fishRef}
				size="large"
				fishColor={color}
				draggable={false}
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
				{...singleFishProps}
			></SingleFish>
		</Wrapper>
	)
}
