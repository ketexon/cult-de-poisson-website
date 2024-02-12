import { Box, Stack, Typography, AppBar, Toolbar, IconButton, useScrollTrigger } from "@mui/material";
import Link from "./Link";

import menuConfig from "~/menuConfig";
import { MenuIcon } from "./Icons";
import React from "react";
import Menu from "./Menu";

export type NavProps = {
}

export default function Nav({ }: NavProps){
	const [menuOpen, setOpen] = React.useState(false);
	const elevated = useScrollTrigger({
		disableHysteresis: true,
		threshold: 64,
	})

	return (
		<AppBar
			component="header"
			position="sticky"
			elevation={0}
			sx={theme => ({
				background: elevated ? theme.palette.background.default : "transparent",
				borderBottom: `1px solid transparent`,
				borderBottomColor: elevated ? theme.palette.divider : "transparent",
				transition: theme.transitions.create(["border-bottom-color", "background"], {
					duration: theme.transitions.duration.shortest,
					easing: theme.transitions.easing.easeOut,
				}),
			})}
		>
			<Toolbar sx={theme => ({
				transition: theme.transitions.create("padding-top", {
					duration: theme.transitions.duration.shortest,
					easing: theme.transitions.easing.easeOut,
				}),
				pt: elevated ? 0 : 5,
			})}>
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
						open={menuOpen}
						hideWhileClosed={false}
						handleClose={() => setOpen(false)}
						sx={theme => ({
							mt: 1,
							background: "transparent",
							[theme.breakpoints.down("lg")]: {
								background: theme.palette.background.default,
								border: `1px solid ${theme.palette.divider}`
							},
							display: "flex",
							flexDirection: "column",
							transition: theme.transitions.create(["translate", "transform", "background"], {
								duration: theme.transitions.duration.enteringScreen,
								easing: theme.transitions.easing.easeOut,
							}),
							transform: menuOpen
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
							<Link href={href} color="primary" key={title} onClick={() => { setOpen(false); }}>
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
					fontSize="2rem"
				>
					culte du poisson
				</Typography>
			</Toolbar>
		</AppBar>
	);
}