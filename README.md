# Proof of Concept to Render Mdast as PDF

Implemented with [`react-pdf`](https://github.com/diegomura/react-pdf).

```
yarn
yarn run dev

open http://localhost:3007/example
```

## Env

```
API_URL=https://api.republik.ch/graphql
```

You can create a local `.env` file which will be auto loaded.

## Linking dependencies

This project currently relies on libraries versions that are under development, or not merged to his correspondant `master` branch.
These are:

- `react-pdf#textkit`:  This branch includes all the upcoming `textkit` implementation inside react-pdf
  - `devongovett/textkit#master`: Textkit implementation. This is not published on npm yet, since this also relies on unpublished versions of pdfkit and fontkit
  - `diegomura/pdfkit#textkit`(*): Some additions to pdfkit made by Devon and I in order to make textkit work
  - `diegomura/fontkit#string-indices`(*): This also adds some changes to fontkit, including the ability to export string indices

(*) These will be moved under the `react-pdf` organization eventually. Both projects are not merging anything to master lately, so probably these will became react-pdf source for awhile

### Steps to locally link dependencies

1. Clone all repos locally in your machine, and checkout the correct branch in each
2. Run build sript on each project. This can be `yarn build` or `yarn prepublish`
3. Run `yarn link` under each project.
4. Inside `react-pdf` project:
  - Uninstall current pdfkit and fontkit versions
  - Run `yarn link textkit`
  - Run `yarn link pdfkit`
  - Run `yarn link fontkit`
5. Inside `textkit` project
  - Uninstall current pdfkit and fontkit versions
  - Run `yarn link pdfkit`
  - Run `yarn link fontkit`
6. Inside `pdfkit` project
  - Uninstall current fontkit versions
  - Run `yarn link fontkit`
