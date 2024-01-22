import { Stack, Typography } from "@mui/material"
import NextImage, { ImageProps as NextImageProps } from "next/image"

export type ImageProps = {
	caption?: string,
} & NextImageProps

function getStaticImageData(src: ImageProps["src"]) {
	return typeof src === "string"
		? null
		: "default" in src
		? src.default
		: src;
}

function getImageSrc(src: ImageProps["src"]) {
	return typeof getStaticImageData(src)?.src ?? src as string;
}

export default function Image({ caption, ...props }: ImageProps){
	const staticImageData = getStaticImageData(props.src);

	return <Stack component="figure" m={0} display="inline-flex" alignItems="stretch" sx={{ float: "right" }}>
		<NextImage
			{...{
				loading: "eager",
				...props,
				...(props.width && !props.height && staticImageData) ? {
					height: parseInt(props.width.toString()) * staticImageData.height / staticImageData.width
				} : {},
				style: { objectFit: "cover", ...(props.style ?? {}) },
			}}
		/>
		{ caption && <Typography variant="subtitle1" component="figcaption" sx={{ minWidth: 0, width: "100%", }}>{caption}</Typography>}
	</Stack>
}