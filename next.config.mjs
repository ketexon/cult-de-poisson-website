import createMDX from '@next/mdx';

import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	images: {
		unoptimized: true,
	},
	pageExtensions: [
		'page.js', 'index.js',
		'page.jsx', 'index.jsx',
		'page.ts', 'index.ts',
		'page.tsx', 'index.tsx',
		'page.mdx',
	],
};

const withMDX = createMDX({
	options: {
		remarkPlugins: [
			remarkFrontmatter,
			remarkMdxFrontmatter
		]
	}
});

export default withMDX(nextConfig);