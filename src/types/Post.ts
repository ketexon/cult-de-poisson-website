export type Post = {
	title: string,
	description?: string,
	date: Date,
}

export function parsePost(frontmatter: undefined | null | { [key: string]: any }): Post {
	if(!frontmatter) return null;

	if(!frontmatter.title) return null;
	const title = frontmatter.title;

	const description = frontmatter.description ?? undefined;

	const dateMs = Date.parse(frontmatter.date);
	if(isNaN(dateMs)) return null;

	return {
		title,
		description,
		date: new Date(dateMs),
	}
}