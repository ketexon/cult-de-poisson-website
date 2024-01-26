import {Container as MUIContainer, ContainerProps as MUIContainerProps} from "@mui/material"

export type ContainerProps = MUIContainerProps

export default function Container(props: ContainerProps){
	return <MUIContainer maxWidth="md" {...{
		...props,
		sx: [
			{
				py: 2,
			},
			...props.sx ? [props.sx].flat() : [],
		]
	}} />
}