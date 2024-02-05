import { MDXModule, MDXProps } from "mdx/types";
import { StaticImageData } from "next/image";

export type Post = {
	title: string,
	description?: string,
	date: Date,
	Component: (props: MDXProps) => React.ReactNode
} & (
	{
		image: StaticImageData,
		imageAlt: string,
	} | {
		image: undefined,
		imageAlt: undefined
	}
)

export function parsePost(page: MDXModule, filename: string): Post {
	const frontmatter = page.frontmatter as undefined | { [k: string]: any };

	if(!frontmatter) {
		console.error(`Page \`${filename}\` missing frontmatter.`);
		return null;
	}

	if(!frontmatter.title) {
		console.error(`Page \`${filename}\` missing title.`);
		return null;
	}
	const title = frontmatter.title;

	const description = frontmatter.description ?? undefined;

	const dateMs = Date.parse(frontmatter.date);
	if(isNaN(dateMs)) {
		console.error(`Page \`${filename}\` missing date.`);
		return null;
	}

	const image = typeof page.image === "object" ? page.image as Partial<StaticImageData> : undefined;
	// since image is an object, we should check that each of its required properties are present
	// and all of its properties are of the right type
	if(
		image !== undefined && !(
			typeof image.src === "string"
			&& typeof image.height === "number"
			&& typeof image.width === "number"
			&& (image.blurDataURL === undefined || typeof image.blurDataURL === "string")
			&& (image.blurHeight === undefined || typeof image.blurHeight === "number")
			&& (image.blurWidth === undefined || typeof image.blurWidth === "number")
		)) {
		console.error(
			`Page \`${filename}\` has invalid image format.\nPlease import the image then export it. (see \`demopage\` for example)`
		);
		return null;
	}

	if(image !== undefined && typeof page.imageAlt !== "string"){
		console.error(`Page \`${filename}\` does not have required export \`imageAlt\`.`);
		return null;
	}

	return {
		title,
		description,
		date: new Date(dateMs),
		Component: page.default,
		...image !== undefined ? {
			image: image as StaticImageData,
			imageAlt: page.imageAlt as string,
		} : {
			image: undefined,
			imageAlt: undefined,
		}
	}
}