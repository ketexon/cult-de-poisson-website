import fs from "fs/promises";
import path from "path";

import matter from "gray-matter";

import nextConfig from "../../next.config.mjs"

import { ArgumentParser } from "argparse";

const parser = new ArgumentParser({
	description: "Codegen for pages"
})

parser.add_argument("-d", "--draft", {
	action: "store_true",
	help: "Show unpublished pages",
});

const { draft }: {
	draft: boolean
} = parser.parse_args();

type Page = {
	import: string,
	filename: string
}

const dynamicExtensions = [
	"mdx"
]

const pageExtensions = [...dynamicExtensions, ...nextConfig.pageExtensions]

function isValidPage(p: string): boolean{
	return pageExtensions.some(ext => {
		const pageName = getPageName(p, ext);
		return pageName !== null && pageName !== "index" && !/^\[.*\]$/.test(pageName)
	});
}

/**
 * @param {string} p
 * @returns {boolean}
 */
function isValidIndexPage(p){
	return pageExtensions.some(ext => getPageName(p, ext) === "index");
}

/**
 * @param {*} p
 * @returns {string}
 */
function normalizeImport(p){
	const { ext, name } = path.parse(p);
	return [".tsx", ".ts", ".jsx", ".js"].includes(ext) ? name : p;
}

/**
 * @param {string} p
 * @param {string} ext
 * @returns {string}
 */
function getPageName(p, ext = null){
	if(!ext){
		const exts = pageExtensions.filter(ext => p.endsWith(`.${ext}`) && !/^[.*]$/.test(p.substring(0, p.length - ext.length - 1)))
		ext = exts.length > 0 ? exts[0] : null;
	}
	return ext !== null && p.endsWith(`.${ext}`) ? p.substring(0, p.length - ext.length - 1) : null;
}

async function isPagePublished(page: Page, root: string): Promise<boolean> {
	const ext = path.parse(page.import).ext;
	if(ext.match(/^\.mdx?$/)){
		const absPath = path.join(root, page.import);
		const content = await fs.readFile(absPath);
		const { data } = matter(content);
		return data.published !== false;
	}
	return true;
}


async function main(){
	const cwd = process.cwd();
	const pagesDir = path.join(cwd, "src", "pages");

	/**
	 * @param {string} dir
	 */
	async function generateCodeForDirectory(dir){
		// all the pages in the directory that are rendered by NextJS
		// (determined using next.config's pageExtensions)
		// relative to `dir`
		const dirEntries = await fs.readdir(dir)

		// find all pages in dir
		const filePages = dirEntries.filter(isValidPage).map(p => ({
			import: normalizeImport(p),
			filename: getPageName(p)
		}));

		// finds all pages that are index.{ext} in immediate subdirectories
		const indexPages = (await Promise.all(dirEntries.map(async p => {
			const pageDir = path.join(dir, p);
			const stat = await fs.stat(pageDir);
			if(stat.isDirectory()){
				const subPages = await fs.readdir(pageDir);
				const indexSubPages = subPages.filter(isValidIndexPage)
				if (indexSubPages.length > 0){
					const indexSubPage = indexSubPages[0];
					return {
						import: normalizeImport(path.join(p, indexSubPage).replaceAll('\\', '/')),
						filename: p
					}
				}
			}
			return null;
		}))).filter(p => p !== null)

		const pages = (await Promise.all([...filePages, ...indexPages].map(async page => {
			return draft || await isPagePublished(page, dir) ? page : null
		}))).filter(page => page !== null);

		const duplicates = pages.filter(({ filename: fa }, ai) => pages.findLastIndex(({ filename: fb}) => fa === fb) > ai);
		if(duplicates.length > 0){
			console.error(`Duplicate files in ${dir}: ${duplicates.map(d => `"${d.filename}"`).join(", ")}`)
		}

		const generatedFolder = path.join(dir, "__generated");

		await fs.access(generatedFolder).catch(() => {
			fs.mkdir(generatedFolder)
		})

		const generatedFile = path.join(generatedFolder, "index.ts");

		const imports = pages.map((page, i) => `import * as indexContent${i} from "../${page.import}";`).join("\n");
		const exportObject = pages.map((page, i) => `\t"${page.filename}": indexContent${i},`).join("\n");
		const generated = (
			imports + '\n'
			+ '\n'
			+ `export default {\n${exportObject}\n};`
		)

		const old = await fs.readFile(generatedFile)
			.then(buffer => buffer.toString())
			// if file doesn't exist/not string (also if no perms, but that's a problem we won't worry about c;)
			.catch(() => null);

		if(old !== generated){
			await fs.writeFile(generatedFile, generated);
		}
	}

	await Promise.all(await fs.readdir(pagesDir)
		.then(pages => pages.map(async pagePath => {
			const absolutePath = path.join(pagesDir, pagePath);
			if(!(await fs.stat(absolutePath)).isDirectory()) {
				return null;
			}
			generateCodeForDirectory(absolutePath)
		}))
	);
}

main();