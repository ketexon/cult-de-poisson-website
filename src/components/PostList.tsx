import { MDXModule } from "mdx/types"

import { Post, parsePost } from "../types/Post";
import PostCard from "./PostCard";
import { Stack, Typography } from "@mui/material";

import path from "path";
import Head from "next/head";
import generateTitle from "~/util/generateTitle";

export type PostListProps = {
	title: string,
	baseURL: string,
	pages: { [key: string]: MDXModule },
}

export default function PostList({ title, baseURL, pages }: PostListProps){
	return <>
		<Head><title>{generateTitle(title)}</title></Head>
		<Stack direction="column" gap={2}>
			<Typography variant="h1">{title}</Typography>
			<Stack direction="column" gap={1}>
				{ Object.entries(pages).map(([key, page]) => {
					const frontmatter = page.frontmatter;
					const post = parsePost(frontmatter);
					if(post === null){
						console.error(`${title}: Page with filename "${key}" does not have required frontmatter.`);
						return null;
					}
					return <PostCard key={key} post={post} href={path.join(baseURL, key).replaceAll('\\', '/')} />
				})}
			</Stack>
		</Stack>
	</>
}