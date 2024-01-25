import { StaticImageData } from "next/image"
import AubreyHeadshot from "~/assets/photos/members/Aubrey Clark.webp"

export type Member = {
	name: string,
	description: string,
	headshot: StaticImageData,
}

export default [
	{
		name: "Aubrey Clark",
		description: "Technical lead of Cult de Poisson. UCLA class of 2025 Linguistics and Computer Science major and mathematics minor.",
		headshot: AubreyHeadshot,
	}
]