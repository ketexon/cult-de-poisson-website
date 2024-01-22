import { Box, Stack, Typography } from "@mui/material";
import Link from "./Link";

import menuConfig from "~/menuConfig";

export default function SideNav(){
	return (
		<Box
			component="header"
			sx={theme => ({
				display: "grid",
				gridTemplateRows: "auto 1fr auto",
				height: "100%",
				backgroundColor: theme.palette.primary.main,
				p: 2,
			})}
		>
			<Stack
				direction="column"
				justifyContent="center" alignItems="flex-end"
				gap={2}

				height="100%"

				sx={theme => ({
					gridRowStart: 2
				})}
			>
				<Stack direction="column">
					<Typography variant="h1" whiteSpace="nowrap" margin={0}>
						Cult de Poisson
					</Typography>
					<Typography variant="body1" whiteSpace="nowrap">
						Game Dev Studio @ UCLA
					</Typography>
				</Stack>
				<Stack direction="column" component="nav">
					{menuConfig.items.map(({ title, href }) => (
						<Link key={title} href={href} color="primary.light">{title}</Link>
					))}
				</Stack>
			</Stack>
			<Stack
				direction="row"
				justifyContent="flex-end"
				sx={{ gridRowStart: 3 }}
			>
				Hello
			</Stack>
		</Box>
	);
}