import { Typography, TypographyProps, css, keyframes } from "@mui/material"
import React from "react"

import seedrandom from "seedrandom"

const rotate = keyframes`
	from {
		rotate: var(--rotate-min);
	}

	to {
		rotate: var(--rotate-max);
	}
`

export type RotateTextProps = {
	children: string,
	seed?: string,
	rotateAmount?: number,
	rotateCenter?: number,
	maxRotateOffset?: number,
	alternate?: boolean,
	animate?: boolean,
	letterSpacing?: string,
	lineHeight?: string | number,
	typographyProps?: TypographyProps,
}

export default function RotateText({
	children,
	seed,
	rotateAmount,
	rotateCenter,
	maxRotateOffset,
	alternate,
	animate,
	letterSpacing,
	typographyProps,
	lineHeight,
}: RotateTextProps){
	alternate ??= true;
	rotateAmount ??= 5;
	maxRotateOffset ??= 20;
	rotateCenter ??= 0
	seed ??= children;
	animate ??= true;

	const rng = seedrandom(seed);

	const mp = ['-', '+']

	return <>
		{children.split("").map((char, i) => (
			/\s/.test(char)
				? char
				: (
					<Typography variant="inherit" component="span" display="inline-block"
						textAlign="center"
						key={`${char}${i}`}
						lineHeight={lineHeight}
						sx={{
							"--offset": `${(rng.quick() * 2 - 1) * maxRotateOffset + rotateCenter}deg`,
							...animate ? {
								"--rotate-min": `calc(var(--offset) ${mp[alternate ? i % 2 : 0]} ${rotateAmount}deg)`,
								"--rotate-max": `calc(var(--offset) ${mp[alternate ? (i + 1) % 2 : 1]} ${rotateAmount}deg)`,
								animation: `${rotate} 1s ease-in-out infinite alternate`
							} : {
								rotate: `var(--offset)`,
							},
							...letterSpacing ? {
								letterSpacing: `calc(${letterSpacing} / 2)`,
								pl: `calc(${letterSpacing} / 2)`,
							} : {}
						}}
						{...typographyProps ?? {}}
					>{char}</Typography>
				)
		))}
	</>
}