import { Box, Stack, Typography } from "@mui/material";
import Link from "./Link";

import menuConfig from "~/menuConfig";

export default function SideNav(){
	return <Stack component="nav"
		direction="column"
		justifyContent="center" alignItems="flex-end"
		gap={2}

		p={2}
		height="100%"

		sx={theme => ({
			backgroundColor: theme.palette.primary.main,
		})}
	>
		<Typography variant="h1" whiteSpace="nowrap">
			Cult de Poisson
		</Typography>
		<Stack direction="column">
			{menuConfig.items.map(({ title, href }) => (
				<Link key={title} href={href} color="primary.light">{title}</Link>
			))}
		</Stack>
	</Stack>
}