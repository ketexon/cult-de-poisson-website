import Head from "next/head";
import React from "react";
import { origin } from "~/origin";

export type MetadataProps = {
	title: string,
	url: string,
	type?: "article" | "website",
	images?: { src: string, width?: number, height?: number, alt?: string }[],
	description?: string,
	publishedDate?: Date,
	author?: string,
}

export default function Metadata({ title, url, type, images, description, publishedDate, author}: MetadataProps){
	return <Head>
		<meta property="og:title" content={title} key="og:title"/>
		<meta property="og:url" content={url} key="og:url" />
		<link rel="canonical" href={url} key="canonical" />
		{ type && <meta property="og:type" content={type} key="og:type"/> }
		{images?.map(({ src, width, height, alt}, i) => <React.Fragment key={i}>
			<meta property="og:image" content={src} key={`og:image${i}`}/>
			{ width && <meta property="og:image:width" content={width.toString()} key={`og:image${i}:width`} /> }
			{ height && <meta property="og:image:height" content={height.toString()} key={`og:image${i}:height`} /> }
			{ alt && <meta property="og:image:alt" content={alt} key={`og:image${i}:alt`} /> }
		</React.Fragment>)}
		{description && <>
			<meta property="description" content={description} key="description" />
			<meta property="og:description" content={description} key="og:description" />
		</>}
		{ publishedDate && <>
			<meta property="article:published_time" content={publishedDate.toISOString()} key="article:published_time" />
		</>}
		{author && <>
			<meta property="author" content={author} key="author" />
			<meta property="profile:first_name" key="profile:first_name" content={author.split(" ")[0]}/>
			<meta property="profile:last_name" key="profile:last_name" content={author.split(" ").at(-1)} />
		</>}
		<meta name="twitter:card" content="summary_large_image" />
	</Head>
}