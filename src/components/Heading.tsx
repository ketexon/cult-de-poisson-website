import { SxProps, Typography, TypographyProps } from "@mui/material";
import RotateText from "./RotateText";
import React from "react";

export type HeadingProps = {
	letterSpacing?: number,
	children?: React.ReactNode,
	seed?: string,
	textTransform?: React.CSSProperties["textTransform"],
	sx?: SxProps,
	component?: TypographyProps["component"],
	fontSize?: string,
}

export default function Heading({ letterSpacing, children, seed, textTransform, sx, component, fontSize }: HeadingProps){
	letterSpacing ??= 0.5;
	seed ??= typeof children === "string" ? children : "";
	component ??= "h1";
	fontSize ??= "4rem";

	return (
		<Typography
			variant="h1" component={component}
			fontFamily="sniglet" fontWeight={800}
			color="primary"
			fontSize={fontSize}
			letterSpacing={`${letterSpacing}rem`}
			textAlign="center"
			sx={[{
				"& > *": {
					pl: `${letterSpacing}rem`
				}
			}, ...[sx ?? []].flat()]}
			textTransform={textTransform ?? "uppercase"}
		>
			{ typeof children === "string"
				? <RotateText seed={seed}>{children}</RotateText>
				: children
			}
		</Typography>
	)
}