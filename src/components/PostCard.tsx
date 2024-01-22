import { Box, Paper, Stack, Typography, alpha } from "@mui/material"
import { Post } from "../types/Post"
import Link from "./Link"

export type PostCardProps = {
	post: Post,
	href: string,
}

export default function PostCard({ post, href }: PostCardProps){
	return <Link href={href}
		underline="none"
		sx={theme => ({
			color: "initial",
			"& .post__title": {
				textDecoration: "underline",
				textDecorationColor: alpha(theme.palette.primary.main, 0.4)
			},
			"&:hover .post__title": {
				textDecorationColor: theme.palette.primary.main,
			}
		})}
	>
		<Stack
			component="article"
			p={2}
			gap={1}
			sx={theme => ({
				border: `1px solid ${theme.palette.divider}`
			})}
		>
			<Typography variant="h2" component="h1" className="post__title">
				{ post.title }
			</Typography>
			{ post.description && (
				<Typography variant="body1" whiteSpace="pre-line">
					{ post.description }
				</Typography>
			)}
			<Typography variant="subtitle1">{ post.date.toDateString() }</Typography>
		</Stack>
	</Link>
}