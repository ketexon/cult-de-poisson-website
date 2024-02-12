import { Box, Typography } from "@mui/material"
import Image, { ImageProps } from "next/image"

import seedrandom from "seedrandom"
import Icon from "~/components/Icon"

export type CardProps = {
	imageSrc: Exclude<ImageProps["src"], string>,
	name: string,
	description: string,
	links: { icon: string, href: string }[]
}

const Pin = (props: React.SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
		<rect width="0.584135" height="8.19135" transform="matrix(0.721595 -0.692315 0.738532 0.674218 39.1074 39.4773)" fill="#979393" />
		<rect width="0.584135" height="8.19135" transform="matrix(0.721595 -0.692315 0.738532 0.674218 39.5288 39.0728)" fill="#D9D9D9" />
		<ellipse cx="35.8686" cy="35.5436" rx="14" ry="5.5" transform="rotate(-45.7117 35.8686 35.5436)" fill="#6E0C0C" />
		<ellipse cx="35.1528" cy="34.8454" rx="14" ry="5.5" transform="rotate(-45.7117 35.1528 34.8454)" fill="#BC2323" />
		<path d="M40.3633 27.3556C41.9447 28.8981 40.4131 33.0331 36.9423 36.5912C33.4715 40.1493 29.3759 41.7832 27.7945 40.2406C26.2131 38.698 27.7448 34.5631 31.2156 31.005C34.6864 27.4469 38.782 25.813 40.3633 27.3556Z" fill="#6E0C0C" />
		<rect x="9.18311" y="22.0854" width="18" height="26" transform="rotate(-45.7117 9.18311 22.0854)" fill="#BC2323" />
		<ellipse cx="15.4673" cy="15.643" rx="16" ry="5" transform="rotate(-45.7117 15.4673 15.643)" fill="#821212" />
		<ellipse cx="14.7515" cy="14.9447" rx="16" ry="5" transform="rotate(-45.7117 14.7515 14.9447)" fill="#BC2323" />
		<path d="M40.3633 27.3555C41.5494 28.5125 39.6972 32.3348 36.2264 35.8929C32.7556 39.451 28.9805 41.3975 27.7945 40.2406C26.6084 39.0836 28.4606 35.2613 31.9314 31.7032C35.4022 28.1451 39.1773 26.1986 40.3633 27.3555Z" fill="#BC2323" />
	</svg>

)

export default function Card({ imageSrc, name, description, links }: CardProps) {
	const rng = seedrandom(name);
	const imageRotation = - rng() * 15;

	const staticImageData = "default" in imageSrc ? imageSrc.default : imageSrc;

	const aspect = staticImageData.width / staticImageData.height;

	const borderColor = "#AC7454";
	const fillColor = "#F89C68";

	return <Box sx={{
		display: "flex",
		flexDirection: "column",
	}}>
		{/* <svg viewBox="0 0 100 100">
			<ellipse cx="50" cy="50" rx="50" ry="50" fill={borderColor} />
			<ellipse cx="50" cy="50" rx="45" ry="40" fill={fillColor} />
		</svg> */}
		<svg viewBox="0 0 410 142" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", overflow: "clip" }}>
			<ellipse cx="205.039" cy="209.669" rx="205.039" ry="209.669" fill="#AC7454" />
			<rect x="1.22778" y="204.135" width="408.85" height="432.865" fill="#AC7454" />
			<rect y="104.527" width="28.2389" height="532.473" fill="#AC7454" />
			<rect x="381.839" y="104.527" width="28.2389" height="532.473" fill="#AC7454" />
			<ellipse cx="205.039" cy="182.45" rx="171.889" ry="125.882" fill="#F89C68" />
		</svg>
		<Box sx={{
			backgroundColor: borderColor,
			display: "flex",
			justifyContent: "center",
			height: "100%",
			pb: 4,
		}}>
			<Box sx={{
				width: "85%",
				backgroundColor: fillColor,
				display: "flex",
				flexDirection: "column",
			}}>
				<Box sx={{
					width: "100%",
					display: "grid",
					"& > *": {
						gridColumn: 1,
						gridRow: 1,
						justifySelf: "center",
						alignSelf: "center",
					},
					aspectRatio: 1,
					"--origin-x": "3rem",
					"--origin-y": "4rem",
					transformOrigin: "var(--origin-x) var(--origin-y)",
					transform: `rotate(${imageRotation}deg)`,
				}}>
					<svg viewBox="0 0 341 314" fill="none" xmlns="http://www.w3.org/2000/svg" style={{
						width: "100%",
						height: "100%",
					}}>
						<g filter="url(#filter0_d_203_2)">
							<path d="M21.7544 11.8577C21.7544 11.8577 182.104 3.60675 270.861 3.93186C267.397 25.8506 275.562 43.3905 275.562 43.3905C275.562 43.3905 283.225 4.03533 286.449 4.09449C313.268 4.58661 330.187 6.18649 328.139 9.55201C319.685 23.4467 310.776 301.014 310.776 301.014C310.776 301.014 142.578 305.158 58.0572 299.891C58.7386 296.984 52.6391 284.915 54.2166 278.186C55.7941 271.457 49.6484 284.774 44.0793 300.003C46.1884 273.955 45.213 264.221 45.213 264.221C45.213 264.221 36.7149 299.004 35.4119 298.888C19.3003 297.449 8.55084 295.501 6.12317 292.893C-7.87435 277.853 21.7544 11.8577 21.7544 11.8577Z" fill="#FBECD3" />
						</g>
						<defs>
							<filter id="filter0_d_203_2" x="0.366699" y="0.922607" width="339.94" height="312.641" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
								<feFlood flood-opacity="0" result="BackgroundImageFix" />
								<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
								<feOffset dx="5" dy="4" />
								<feGaussianBlur stdDeviation="3.5" />
								<feComposite in2="hardAlpha" operator="out" />
								<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
								<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_203_2" />
								<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_203_2" result="shape" />
							</filter>
						</defs>
					</svg>

					<Pin style={{
						position: "absolute",
						left: "var(--origin-x)",
						top: "var(--origin-y)",
						"--width": "3rem",
						"--height": "3rem",
						width: "var(--width)",
						height: "var(--height)",
						transform: `
							translateX(calc(-1*var(--width)))
							translateY(calc(-1*var(--height)))
							rotate(${-imageRotation}deg)
						`
					} as React.CSSProperties}/>

					<Image src={imageSrc} alt="" style={{
						width: "60%", height: "unset",
						aspectRatio: 1,
						objectFit: "cover",
						objectPosition: "center",
						transform: `translateX(-5px)`
					}} />
				</Box>
				<Box sx={theme => ({
					width: "100%",
					border: `${theme.spacing(0.5)} solid #917618`,
					backgroundColor: "#FFBF00",
					display: "grid",
					gridTemplateColumns: `${theme.spacing(1)} 1fr ${theme.spacing(1)}`,
					gridTemplateRows: `${theme.spacing(1)} 1fr ${theme.spacing(1)}`,
					flexGrow: 1,
				})}>
					<>
						<svg viewBox="0 0 100 100" style={{
							gridRowStart: 1,
							gridColumnStart: 1,
						}}>
							<path d="M0,0 L100,100" stroke="#735C17" strokeWidth="10" />
						</svg>
						<svg viewBox="0 0 100 100" style={{
							gridRowStart: 3,
							gridColumnStart: 3,
						}}>
							<path d="M0,0 L100,100" stroke="#735C17" strokeWidth="10" />
						</svg>
					</>
					<>
						<svg viewBox="0 0 100 100" style={{
							gridRowStart: 3,
							gridColumnStart: 1,
						}}>
							<path d="M100,0 L0,100" stroke="#735C17" strokeWidth="10" />
						</svg>
						<svg viewBox="0 0 100 100" style={{
							gridRowStart: 1,
							gridColumnStart: 3,
						}}>
							<path d="M100,0 L0,100" stroke="#735C17" strokeWidth="10" />
						</svg>
					</>
					<Box sx={{
						gridRowStart: 2,
						gridColumnStart: 2,
						width: "100%",
						backgroundColor: "#E1AC0C",
						p: 2,
						display: "flex",
						flexDirection: "column",
					}}>
						<Typography variant="h2" component="h1" color="#28471A" textAlign="center">
							{name}
						</Typography>
						<Typography variant="body2" color="#8A6B0C">
							{description}
						</Typography>
						<Box flexGrow={1} sx={{
							mt: 2,
							display: "flex",
							flexDirection: "row",
							alignItems: "end",
						}}>
							{
								links?.map(({ icon, href }) => (
									<Icon name={icon} href={href} target="_blank"/>
								))
							}
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
		{/* <Box sx={{
			mt: "50%",
			width: "100%", height: "100%",
			borderLeft: `2rem solid ${borderColor}`,
		}}>

		</Box> */}
		{/* <Image src={imageSrc} alt="" /> */}
	</Box>
}