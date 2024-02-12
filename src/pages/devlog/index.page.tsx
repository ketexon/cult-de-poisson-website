import { GetStaticPropsResult } from "next";
import pages from "./__generated";
import { MDXModule } from "mdx/types";
import PostList from "../../components/PostList";
import Metadata from "~/components/Metadata";
import { origin } from "~/origin";


export default function Devlog(){
	return <>
		<Metadata {...{
			title: "Culte du Poisson Devlogs",
			url: `${origin}/devlogs`
		}}/>
		<PostList title="Devlog" baseURL="devlog" pages={pages} />
	</>
}