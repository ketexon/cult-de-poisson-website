import { GetStaticPaths, GetStaticProps } from "next"

export type Template<P extends { [k: string]: any }> = {
	getStaticPaths?: GetStaticPaths,
	getStaticProps?: GetStaticProps<P>,
	component: React.ComponentType<P>
}