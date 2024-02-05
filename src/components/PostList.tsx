import { MDXModule } from "mdx/types"

import { Post, parsePost } from "../types/Post";
import PostCard from "./PostCard";
import { Stack, Typography } from "@mui/material";

import path from "path";
import Head from "next/head";
import generateTitle from "~/util/generateTitle";
import Heading from "./Heading";

export type PostListProps = {
	title: string,
	baseURL: string,
	pages: { [key: string]: MDXModule },
}

export default function PostList({ title, baseURL, pages }: PostListProps){
	return <>
		<Head><title>{generateTitle(title)}</title></Head>
		<Stack direction="column" gap={2} mb={8}>
			<Heading>{title}</Heading>
			<Stack direction="column" gap={16}>
				{ Object.entries(pages).map(([key, page]) => {
					const post = parsePost(page, key);
					if(post === null){
						console.error(`${title}: Page \`${key}\` is missing frontmatter or exports.`);
						return null;
					}
					return <PostCard type="link" key={key} post={post} href={path.join(baseURL, key).replaceAll('\\', '/')} />
				})}
			</Stack>
		</Stack>
	</>
}