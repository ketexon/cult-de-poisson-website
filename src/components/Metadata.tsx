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
		<meta name="og:title" content={title} key="og:title"/>
		<meta name="og:url" content={url} key="og:url" />
		<link rel="canonical" href={url} key="canonical" />
		{ type && <meta name="og:type" content={type} key="og:type"/> }
		{images?.map(({ src, width, height, alt}, i) => <React.Fragment key={i}>
			<meta name="og:image" content={src} key={`og:image${i}`}/>
			{ width && <meta name="og:image:width" content={width.toString()} key={`og:image${i}:width`} /> }
			{ height && <meta name="og:image:height" content={height.toString()} key={`og:image${i}:height`} /> }
			{ alt && <meta name="og:image:alt" content={alt} key={`og:image${i}:alt`} /> }
		</React.Fragment>)}
		{description && <>
			<meta name="description" content={description} key="description" />
			<meta name="og:description" content={description} key="og:description" />
		</>}
		{ publishedDate && <>
			<meta name="article:published_time" content={publishedDate.toISOString()} key="article:published_time" />
		</>}
		{author && <>
			<meta name="author" content={author} key="author" />
			<meta name="profile:first_name" key="profile:first_name" content={author.split(" ")[0]}/>
			<meta name="profile:last_name" key="profile:last_name" content={author.split(" ").at(-1)} />
		</>}
	</Head>
}