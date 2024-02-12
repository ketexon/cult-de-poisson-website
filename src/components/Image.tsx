import { Box, Stack, StackProps, Typography, TypographyProps } from "@mui/material"
import NextImage, { ImageProps as NextImageProps } from "next/image"
import { CSSProperties } from "react";

export type ImageProps = Omit<NextImageProps, "width" | "height"> & {
	imageWidth?: `${number}`,
	imageHeight?: `${number}`,
	caption?: string,
	captionProps?: TypographyProps,
	maxHeight?: string,
	width?: string,
	height?: string,
	imageStyle?: NextImageProps["style"]
}

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

export default function Image({ caption, captionProps, width, height, imageStyle, imageWidth, imageHeight, ...props }: ImageProps){
	const staticImageData = getStaticImageData(props.src);
	const aspect = staticImageData.width / staticImageData.height;

	if(!width && !height){
		height = "16rem"
	}

	width ??= height ? `calc(${height} * ${aspect})` : undefined;
	height ??= width ? `calc(${width} / ${aspect})` : undefined;

	return <Stack sx={{ alignItems: "center"}} mb={2}>
		<Stack component="figure" m={0} maxWidth={width} gap={1}>
			<NextImage
				{...props}
				{...{
					width: imageWidth,
					height: imageHeight
				}}
				style={{
					...imageStyle ?? {},
					width: width,
					height: height,
					objectFit: "contain",
					aspectRatio: staticImageData.width / staticImageData.height
				}}
			/>
			{caption && <Typography
				component="figcaption"
				variant="subtitle1"
				lineHeight={1}
				fontFamily="monospace"
				textAlign="center"
				{...captionProps}
			>
				{caption}
			</Typography>}
		</Stack>
	</Stack>
}