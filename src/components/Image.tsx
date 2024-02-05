import { Stack, StackProps, Typography } from "@mui/material"
import NextImage, { ImageProps as NextImageProps } from "next/image"
import { CSSProperties } from "react";

export type ImageProps = NextImageProps & {
	caption?: string,
	imageStyle?: NextImageProps["style"],
	sx?: Exclude<StackProps["sx"], ReadonlyArray<any>>,
	style?: StackProps["style"],
	objectFit?: CSSProperties["objectFit"],
	setAspectRatio?: boolean,
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

export default function Image({ caption, sx, imageStyle, setAspectRatio, ...props }: ImageProps){
	setAspectRatio ??= false;
	const staticImageData = getStaticImageData(props.src);

	return <Stack component="figure" m={0} display="inline-flex" alignItems="stretch" sx={[
			{
				// float: "right",
				"& .CDP-Image__img": {
					objectFit: props.objectFit ?? "cover",
					maxHeight: "100%",
					...setAspectRatio && staticImageData ? {
						aspectRatio: `${staticImageData.height} / ${staticImageData.width}`,
					} : {},
					...(imageStyle ?? {})
				},
			},
			sx ?? {}
		]}>
		<NextImage
			className="CDP-Image__img"
			{...{
				loading: "eager",
				...props,
				...(props.width && !props.height && staticImageData) ? {
					height: parseInt(props.width.toString()) * staticImageData.height / staticImageData.width
				} : {},
			}}
		/>
		{ caption && <Typography variant="subtitle1" component="figcaption" sx={{ minWidth: 0, width: "100%", }}>{caption}</Typography>}
	</Stack>
}