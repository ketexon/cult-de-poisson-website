import { GetStaticPropsResult } from "next";
import pages from "./__generated";
import { MDXModule } from "mdx/types";
import PostList from "../../components/PostList";


export default function Devlog(){
	return <PostList title="Devlog" baseURL="devlog" pages={pages} />
}