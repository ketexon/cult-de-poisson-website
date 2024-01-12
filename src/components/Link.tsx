import { Link as MUILink, LinkProps as MUILinkProps } from "@mui/material"
import NextLink, { LinkProps as NextLinkProps } from "next/link"

export type LinkProps = Omit<MUILinkProps, "component"> & NextLinkProps

export default function Link(props: LinkProps){
	return <MUILink component={NextLink} {...props}/>
}