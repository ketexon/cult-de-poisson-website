import { SxProps, Theme, Typography, TypographyProps } from "@mui/material";
import RotateText from "./RotateText";
import React from "react";

export type HeadingProps = {
	letterSpacing?: number,
	children?: React.ReactNode,
	seed?: string,
	textTransform?: React.CSSProperties["textTransform"],
	sx?: SxProps<Theme>,
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
			letterSpacing={`${letterSpacing}rem`}
			textAlign="center"
			sx={[{
				"& > *": {
					pl: `${letterSpacing}rem`
				}
			}, ...[sx ?? []].flat()]}
			textTransform={textTransform ?? "uppercase"}
		>
			<span style={{ fontSize: "2em" }}>
			{ typeof children === "string"
				? <RotateText seed={seed}>{children}</RotateText>
				: children
			}
			</span>
		</Typography>
	)
}