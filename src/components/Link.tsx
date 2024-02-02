import { Link as MUILink, LinkProps as MUILinkProps } from "@mui/material"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import React from "react"

export type LinkProps = Omit<MUILinkProps, "component"> & NextLinkProps

export default React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref){
	return <MUILink ref={ref} component={NextLink} {...props}/>
})