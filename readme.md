# Culte du Poisson Website

Official website for Culte du Poisson.

## Stack

This project uses:

- Typescript for language
- React/MUI/Emotion CSS for frontend
- NextJS 13 (Pages router) on node.js for backend (static site generation)
- Markdown/YAML frontmatter with unified plugins for CMS content

## Setup

This project requires a new version node.js (at least 18).

It also uses `yarn` for package management (to install, use `npm i --global yarn`).

To install necessary packages, `cd` into the root and run `yarn`.

For the CMS content, indexing is done via a simple codegen script in `src/codegen/index-content.ts`. To generate the index files, use `yarn gen`, or `yarn gen:watch` to rerun every time a file is changed automatically. The `gen` script takes the optional argument `--draft` to specify whether to include draft content (content with `draft: true` in the frontmatter). `yarn gen:dev:watch` is a synonym for `yarn gen:watch --draft`.

After indexing content, use `yarn dev-server` to run the NextJS server.

The script `yarn dev` runs both the codegen script and the dev server in parallel using `concurrently`, but using two separate terminals might be nicer.

## Site structure

The site includes the following pages:

- Home
- About
- Projects
- Dev Log

### Home

The home page links to other pages

### About

The about page includes a "Who we are" section, as well as a list of members.

### Projects

The projects page includes what Culte du Poisson is working on.

### Dev Log

The dev log includes weekly logs for the progress of the game.
