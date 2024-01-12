import Head from "next/head";
import * as React from "react";
import generateTitle from "~/util/generateTitle";

export default function Index(){
	return <>
		<Head>
			<title>{generateTitle()}</title>
		</Head>
		<div>HI</div>
	</>
}