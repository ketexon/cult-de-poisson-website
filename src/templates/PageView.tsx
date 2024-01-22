import { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import { MDXContent, MDXModule } from "mdx/types";
import { Box, Stack, Typography } from "@mui/material";
import { parsePost } from "~/types/Post"
import Link from "~/components/Link";
import formatHTMLTimeDate from "~/util/formatHTMLTimeDate";
import formatDate from "~/util/formatDate";
import { Page, PageIndex } from "~/types/Page";
import { Template } from "./Template";
import Head from "next/head";
import generateTitle from "~/util/generateTitle";

type MDXRendererProps = {
	page: string,
}

export default function(pages: PageIndex, pageSegmentName: string = "page"): Template<MDXRendererProps> {
	async function getStaticPaths({}: GetStaticPathsContext): Promise<GetStaticPathsResult> {
		return {
			paths: Object.keys(pages).map(page => ({ params: { [pageSegmentName]: page } })),
			fallback: false
		}
	}

	async function getStaticProps({ params }: GetStaticPropsContext): Promise<GetStaticPropsResult<MDXRendererProps>> {
		return {
			props: {
				page: params[pageSegmentName] as string
			}
		}
	}

	function MDXRenderer({ page }: MDXRendererProps){
		const mdxModule = pages[page] as MDXModule;
		const post = parsePost(mdxModule.frontmatter);

		return <>
			<Head><title>{generateTitle(post.title)}</title></Head>
			<Stack gap={2}>
				<Box><Link href="./">Back to Devlogs</Link></Box>
				<Stack>
					<Typography variant="h1">
						{post.title}
					</Typography>
					<Typography variant="subtitle1" component="time" dateTime={formatHTMLTimeDate(post.date)}>
						{formatDate(post.date)}
					</Typography>
				</Stack>
				<mdxModule.default/>
			</Stack>
		</>
	}

	return {
		getStaticPaths,
		getStaticProps,
		component: MDXRenderer
	}
}