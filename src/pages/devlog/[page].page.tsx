import { GetStaticPathsContext, GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from "next";
import pages from "./__generated/index"
import { MDXContent, MDXModule } from "mdx/types";
import { Box, Stack, Typography } from "@mui/material";
import { parsePost } from "~/types/Post"
import Link from "~/components/Link";
import formatDate from "~/util/formatDate";

import PageViewTemplate from "~/templates/PageView";

const { getStaticPaths, getStaticProps, component } = PageViewTemplate(pages);

export { getStaticPaths, getStaticProps };
export default component;