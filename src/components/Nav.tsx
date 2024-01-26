import { Box, Stack, Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import Link from "./Link";

import menuConfig from "~/menuConfig";
import { MenuIcon } from "./Icons";
import React from "react";
import Menu from "./Menu";

/*
<Stack direction="column" component="nav">
					{menuConfig.items.map(({ title, href }) => (
						<Link key={title} href={href} color="primary.light">{title}</Link>
					))}
				</Stack>
*/

export default function Nav(){
	const [open, setOpen] = React.useState(false);

	return (
		<AppBar
			component="header"
			position="sticky"
			elevation={0}
			sx={theme => ({
				background: "none",
			})}
		>
			<Toolbar sx={{ pt: 3, alignItems: "flex-end"}}>
				<Box position="relative">
					<IconButton onClick={() => { setOpen(o => !o); }}
						sx={{
							"&:hover": { background: "none" },
							p: 0,
						}}
					>
						<MenuIcon fontSize="medium"/>
					</IconButton>
					<Menu
						open={open}
						hideWhileClosed={false}
						handleClose={() => setOpen(false)}
						sx={theme => ({
							mt: 1,
							background: theme.palette.background.default,
							display: "flex",
							flexDirection: "column",
							transition: theme.transitions.create(["translate", "transform"], {
								duration: theme.transitions.duration.enteringScreen,
								easing: theme.transitions.easing.easeOut,
							}),
							transform: open
								? `
									translateX(-2.5%)
									rotate(5deg)
								`
								: `
									translateX(-150%)
									translateY(10%)
									rotate(-20deg)
								`
						})}
					>
						{menuConfig.items.map(({ href, title }) => (
							<Link href={href} color="secondary" key={title} onClick={() => }>
								<Typography
									variant="h2"
									textTransform="lowercase"
									fontWeight="normal"
									sx={{
										textDecorationThickness: "1em",
									}}
								>
									{title}
								</Typography>
							</Link>
						))}
					</Menu>
				</Box>
				<Typography variant="h1"
					color="primary"
					margin={0}
					flexGrow={1}
					textAlign="center"
					lineHeight={0.5}
				>
					cult de poisson
				</Typography>
			</Toolbar>
		</AppBar>
	);
}