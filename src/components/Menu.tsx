import { ClickAwayListener, Paper, SxProps, Theme } from "@mui/material"
import { SystemCssProperties } from "@mui/system"
import React, { ReactNode } from "react"

export type MenuProps = {
	offsetAnchor?: SystemCssProperties<Theme>["offsetAnchor"],
	children?: ReactNode,
	sx?: SxProps<Theme>,
	hideWhileClosed?: boolean,
	open: boolean,
	handleClose: () => void
}



export default function Menu({ offsetAnchor, children, sx, open, handleClose, hideWhileClosed }: MenuProps){
	hideWhileClosed ??= true;

	const [enableClickaway, setEnableClickaway] = React.useState(false);

	// use an effect to enable clickaway AFTER the click event
	React.useEffect(() => {
		setEnableClickaway(open);
	}, [open]);

	const onClickAway = () => {
		handleClose();
	}
	return <ClickAwayListener onClickAway={enableClickaway ? onClickAway : () => {}}>
		<Paper
			role="presentation"
			elevation={0}
			sx={[
				{
					offsetAnchor: offsetAnchor ?? "top left",
					position: "absolute",
					p: 1,
					visibility: hideWhileClosed && !open ? "hidden" : "visible"
				},
				...sx ? [sx].flat() : []
			]}
		>
			{children}
		</Paper>
	</ClickAwayListener>
}