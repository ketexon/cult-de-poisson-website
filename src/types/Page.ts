import { MDXModule } from "mdx/types";

export type Page = MDXModule & { frontmatter?: { [key: string]: string } }

export type PageIndex = { [key: string]: Page }