import { Box, Paper, Stack, Typography, alpha, useTheme } from "@mui/material"
import { Post } from "../types/Post"
import Link from "./Link"
import Heading from "./Heading";
import RotateText from "./RotateText";
import NextImage from "next/image";
import seedrandom from "seedrandom";
import { MDXProps } from "mdx/types";
import { useRouter } from "next/router";

type PostCardFishProps = {
	translateX?: number,
	translateY?: number,
	rotate?: number,
	flipX?: boolean,
	flipY?: boolean,
}

function PostCardFish({ translateX, translateY, rotate, flipX, flipY }: PostCardFishProps){
	translateX ??= 0;
	translateY ??= 0;
	rotate ??= 0;

	flipX ??= false;
	flipY ??= false;

	return (
		<svg width="192" height="100" viewBox="0 0 192 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
			opacity: 0.15, mixBlendMode: "multiply",
			position: "absolute",
			transformOrigin: "50% 50%",
			left: "50%",
			top: 0,
			rotate: `${rotate}deg`,
			translate: `${-50 + translateX}% ${-50 + translateY}%`,
		}}>
			<g style={{
				transformOrigin: "50% 50%",
				scale: `${flipX ? -1 : 1} ${flipY ? -1 : 1}`
			}}>
				<path d="M167.916 49.4671C168.282 75.3634 114.195 99.5896 80.6549 99.5896C47.1143 99.5896 -2.05026 71.9206 2.62878 55.446C4.15559 47.6311 39.7883 2.57775 73.329 2.57775C124.98 2.57775 167.55 23.5708 167.916 49.4671Z" fill="#424749"/>
				<path d="M163.282 3.97023C169.726 -5.00043 183.214 4.49781 182.262 17.3356L180.191 45.2608C180.051 47.1494 180.257 49.1304 180.795 51.0618L189.335 81.7235C192.902 94.5309 181.807 102.556 173.312 93.3135L154.565 72.9183C153.169 71.3997 151.559 70.2655 149.87 69.6117L127.184 60.8308C116.904 56.8515 114.48 39.3064 123.684 35.4923L145.719 26.361C147.107 25.7859 148.318 24.8032 149.266 23.4835L163.282 3.97023Z" fill="#424749"/>
				<ellipse cx="8.78213" cy="12.4628" rx="8.78213" ry="12.4628" transform="matrix(1 0 0.0141405 0.9999 24.6367 32.8462)" fill="#F6F2EB"/>
				<ellipse cx="5.35859" cy="7.60444" rx="5.35859" ry="7.60444" transform="matrix(1 0 0.0141405 0.9999 31.5493 37.4927)" fill="#454545"/>
			</g>
		</svg>
	)
}

export type PostCardProps = {
	post: Post,
} & (
	{
		type: "link",
		href: string,
	}
	| {
		type: "page",
		backHref: string,
	}
)

const headerNumbers = [1,2,3,4,5,6];

const mdxProps: MDXProps = {
	components: {
		...Object.fromEntries(headerNumbers.map(n => [
			`h${n}`,
			({ children }) => <Typography variant="h1" fontFamily="monospace" sx={theme => ({
				color: theme.palette.text.primary
			})}>{children}</Typography>
		])),
		"p": ({ children }) => <Typography variant="body1" fontFamily="monospace" sx={{
			"&:is(+ p)": {
				mb: 0,
				color: "red",
			}
		}}>{children}</Typography>,
		"ol": ({ children }) => <Box component="ol" m={0}>{children}</Box>,
		"li": ({ children }) => <Typography variant="body1" component="li" fontFamily="monospace" m={0}>{children}</Typography>,
	}
};

export default function PostCard(props: PostCardProps){
	let { post, } = props;

	const theme = useTheme();
	const rng = seedrandom(post.title);

	const router = useRouter();

	type ContainerProps = {
		children?: React.ReactNode,
	}
	const Container = props.type === "link" ? (
		({ children }: ContainerProps) => (
			<Link href={props.href}
				underline="none"
				sx={theme => ({
					color: "initial",
					"& .post__title": {
						textDecoration: "underline",
						textDecorationColor: alpha(theme.palette.primary.main, 0.4)
					},
					"&:hover .post__title": {
						textDecorationColor: theme.palette.primary.main,
					},
					display: "flex",
					flexDirection: "column"
				})}
			>{children}</Link>
		)) : (
			({ children }: ContainerProps) => (
				<Box sx={{ position: "relative" }}>{children}</Box>
			)
		)

	const postDate = (
		<Typography variant="body2" fontFamily="monospace" textAlign="center">
			{post.date.toLocaleDateString()}
			{" "}
			{post.date.toLocaleTimeString()}
			{" "}
			{Array.from({ length: 4}).map(
				() => Array.from({ length: 4 }).map(() => Math.floor(rng() * 10).toString()).join("")
			).join(" ")}
		</Typography>
	)

	return <Container>
		{ props.type === "page" && (
			<Box sx={{
				position: "absolute",
			}}>
				<Box sx={{ position: "relative", left: "-100%", p: 2 }}>
					<Link href={props.backHref} onClick={(e) => {
						e.preventDefault();
						router.back();
					}}>Back</Link>
				</Box>
			</Box>
		)}
		<Stack component="article" sx={{
			backgroundColor: theme.palette.background.paper,
			overflow: "clip",
		}}>
			{/* The width is 101% because the SVG clips the last pixel */}
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 690 13" style={{ zIndex: 2 }}>
				<polygon fill={theme.palette.background.default} points="0 3.79 .32 3.55 12.82 13 24.32 4.31 35.82 13 48.32 3.55 60.82 13 73.32 3.55 85.82 13 98.32 3.55 110.82 13 122.32 4.31 133.82 13 146.32 3.55 158.82 13 170.82 3.93 182.82 13 195.32 3.55 207.82 13 219.32 4.31 230.82 13 243.32 3.55 255.82 13 268.32 3.55 280.82 13 293.32 3.55 305.82 13 317.32 4.31 328.82 13 341.32 3.55 353.82 13 362.97 6.08 372.13 13 384.63 3.55 397.13 13 408.63 4.31 420.13 13 432.63 3.55 445.13 13 457.63 3.55 470.13 13 482.63 3.55 495.13 13 506.63 4.31 518.13 13 530.63 3.55 543.13 13 555.13 3.93 567.13 13 579.63 3.55 592.13 13 603.63 4.31 615.13 13 627.63 3.55 640.13 13 652.63 3.55 665.13 13 677.63 3.55 690.13 13 691 12.34 691 0 0 0 0 3.79"/>
			</svg>
			<Stack p={4} gap={1} sx={{ position: "relative" }}>
				<>
					<PostCardFish translateX={-125} translateY={0} rotate={-110}/>
					<PostCardFish translateX={-175} translateY={270} rotate={-50}/>
					<PostCardFish translateX={80} translateY={60} rotate={-35} flipX/>
					<PostCardFish translateX={160} translateY={210} rotate={35} />
					<PostCardFish translateX={-50} translateY={350} rotate={-30}/>
				</>
				{ props.type === "link" && <>
					<Heading textTransform="none" component="p" fontSize="6rem" sx={{
						mt: 2,
						color: "rgba(0, 0, 0, 0.33)",
						mixBlendMode: "multiply",
					}}>
						<RotateText animate={false} seed="1">CULT de</RotateText><br/>
						<RotateText animate={false} seed="16">POISSON</RotateText>
					</Heading>
					<Typography variant="body1" fontFamily="monospace" textAlign="center" lineHeight={1}>
						(888) 888-3474<br/>
						ACM STUDIO<br/>
						UCLA<br/>
						LOS ANGELES, CA 90024<br/>
					</Typography>
				</>}
				<Typography variant="h2" component="h1" fontFamily="monospace" textAlign="center" textTransform="uppercase">
					--- <span className="post__title">{ post.title }</span> ---
				</Typography>
				{ props.type === "page" && postDate }
				{ props.type === "link" && post.image && <Stack sx={{ maxHeight: "16rem", }} alignItems="center" m={2}>
					<NextImage src={post.image} alt={post.imageAlt} style={{
						width: "auto", height: "100%",
					}} />
				</Stack> }
				{ props.type === "link" && post.description && (
					<Typography variant="body1" fontFamily="monospace" whiteSpace="pre-line" m={0} px={12}>
						{ post.description }
					</Typography>
				)}
				{ props.type === "page" && (
					<post.Component {...mdxProps}/>
				)}
				{ props.type === "link" && postDate }
			</Stack>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 690 18">
				<polygon fill={theme.palette.background.default} points="686.32 9.45 673.82 0 661.32 9.45 648.82 0 636.32 9.45 623.82 0 612.32 8.69 600.82 0 588.32 9.45 575.82 0 563.82 9.07 551.82 0 539.32 9.45 526.82 0 515.32 8.69 503.82 0 491.32 9.45 478.82 0 466.32 9.45 453.82 0 441.32 9.45 428.82 0 417.32 8.69 405.82 0 393.32 9.45 380.82 0 371.66 6.92 362.5 0 350 9.45 337.5 0 326 8.69 314.5 0 302 9.45 289.5 0 277 9.45 264.5 0 252 9.45 239.5 0 228 8.69 216.5 0 204 9.45 191.5 0 179.5 9.07 167.5 0 155 9.45 142.5 0 131 8.69 119.5 0 107 9.45 94.5 0 82 9.45 69.5 0 57 9.45 44.5 0 33 8.69 21.5 0 9 9.45 0 2.65 0 18 20.32 18 20.68 18 45.32 18 45.68 18 68.32 18 70.68 18 93.32 18 95.68 18 118.32 18 118.68 18 143.32 18 143.68 18 166.32 18 167.68 18 191.32 18 192.68 18 215.32 18 215.68 18 240.32 18 240.68 18 263.32 18 265.68 18 288.32 18 290.68 18 313.32 18 313.68 18 338.32 18 338.68 18 357 18 361.32 18 382 18 386.32 18 404.63 18 405 18 429.63 18 430 18 452.63 18 455 18 477.63 18 480 18 502.63 18 503 18 527.63 18 528 18 550.63 18 552 18 575.63 18 577 18 599.63 18 600 18 624.63 18 625 18 647.63 18 650 18 672.63 18 675 18 691 18 691 5.91 686.32 9.45"/>
			</svg>
		</Stack>
	</Container>
}