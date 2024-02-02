import { StaticImageData } from "next/image"
import AubreyHeadshot from "~/assets/photos/members/Aubrey Clark.webp"
import NicoletteHeadshot from "~/assets/photos/members/Nicolette.webp"
import AnbuHeadshot from "~/assets/photos/members/Anbu.webp"
import MayaHeadshot from "~/assets/photos/members/Maya B.webp"

export type Member = {
	name: string,
	role: string,
	description: string,
	headshot: StaticImageData,
}

export default [
	{
		name: "Nicolette Bond",
		role: `Writing/Design Lead✍️`,
		description: `Writer whose therapy is in Autodesk Maya?
		Favorite games: Spiritfarer🛶, Ace Attorney⚖️, Pokémon Ranger, simp for Hatoful Boyfriend🦜!
		Shamed for spamming the Discord...
		https://instabio.cc/nicolettebond`,
		headshot: NicoletteHeadshot,
	},
	{
		name: "Maya Balakrishnan",
		role: `Concept / 2D Art Lead`,
		description: `Third year Computer Science major @ UCLA and #1 digital painting enthusiast. Loves decorating cakes, watching video essays at 2x speed, and discovering new music.`,
		headshot: MayaHeadshot,
	},
	{
		name: "Anbu Vajuravel",
		role: `3D/Tech art lead`,
		description: `I'm anbu (they/he) and I like Blender, Night in the Woods and linguistics`,
		headshot: AnbuHeadshot,
	},
	{
		name: "Aubrey Clark",
		role: "Technical Lead",
		description: "Technical lead of Cult de Poisson. UCLA class of 2025 Linguistics and Computer Science major and mathematics minor.",
		headshot: AubreyHeadshot,
	},
] as Member[]