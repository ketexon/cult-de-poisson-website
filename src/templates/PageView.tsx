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
import PostCard from "~/components/PostCard";
import PostMetadata from "~/components/PostMetadata";

type MDXRendererProps = {
	page: string,
}

export default function(baseUrl: string, pages: PageIndex, pageSegmentName: string = "page"): Template<MDXRendererProps> {
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
		const post = parsePost(mdxModule, page);

		return <>
			<Head>
				<title>{generateTitle(post.title)}</title>
			</Head>
			<PostMetadata post={post} baseUrl={baseUrl} />
			<PostCard type="page" post={post} backHref={baseUrl} />
		</>
	}

	return {
		getStaticPaths,
		getStaticProps,
		component: MDXRenderer
	}
}