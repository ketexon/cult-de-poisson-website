import Head from "next/head"
import { Post } from "~/types/Post"

import { origin } from "~/origin"
import Metadata from "./Metadata"

export type PostMetadataProps = {
	post: Post,
	baseUrl: string,
}

export default function PostMetadata({ post, baseUrl }: PostMetadataProps){
	console.log(post.description)
	return <Metadata
		{...{
			title: post.title,
			type: "article",
			images: [{ src: post.image.src, width: post.image.width, height: post.image.height, alt: post.imageAlt }],
			url: `${origin}${baseUrl}/${post.filename}`,

			description: post.description,
			publishedDate: post.date,
			author: post.author,
		}}
	/>
}