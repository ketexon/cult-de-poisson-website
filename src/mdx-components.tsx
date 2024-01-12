import { Typography } from '@mui/material'
import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'

type TypographyVariant = (['h1', 'h2', 'h3', 'h4', 'h5'])[number];

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...Object.fromEntries([1,2,3,4,5].map(n => [`h${n}`, ({ children }) => <Typography variant={`h${n+1}` as TypographyVariant}>{children}</Typography>])),
		img: (props) => (
			<Image
				{...(props as ImageProps)}
			/>
		),
		...components,
	}
}