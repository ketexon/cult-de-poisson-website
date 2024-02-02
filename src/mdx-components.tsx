import { Typography } from '@mui/material'
import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import RotateText from './components/RotateText';

type TypographyVariant = (['h1', 'h2', 'h3', 'h4', 'h5'])[number];

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		...Object.fromEntries([1, 2,3,4,5,6].map(n => [`h${n}`, ({ children }) => <Typography variant={`h${n}` as TypographyVariant}>{children}</Typography>])),
		"p": ({ children }) => <Typography variant="body1">{children}</Typography>,
		img: (props) => (
			<Image
				{...(props as ImageProps)}
			/>
		),
		...components,
	}
}