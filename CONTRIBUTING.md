# Contributing

Hey! Thanks for considering to contribute to this project! We have some tips and tricks to get you started:

## Project Setup

This repository is a monorepo using yarn workspaces and lerna.<br>
The folder structure is a following:

```
┠─ docs: 
┃   Documentation that is common to all packages.
┃
┠─ examples: 
┃   Example projects showing the real-word usage of imagetools.
┃
┖─ packages
    ┠─ core:
    ┃   Holds all transforms and common utility functions needed for builtools integrations.
    ┃
    ┖─ vite: 
        The integration with the vite frontend builtool.
```

## Running Tests

Running `yarn test`from the top level runs all tests for all packages, if your only interested in running tests for a single package cd into that directory and run `yarn test` there.

## Pull Request Guidelines

- All pull requests should be made against the `main` branch. (Not yet applicable)

- Make sure tests pass!

- Commit messages follow the [conventional commits style](). This helps generating changelogs and ensuring proper versioning.

- When adding transforms,

    - does your use case absolutely require a new transform to be added or can it be archived some other way? 

    - make sure the functions don't have any side-effects and don't keep state between invocations.

    - add a section to the specification explaining you transform

## Integrations

Imagetools is written to be easily adaptable to different buildtools and environment, here are a few tips to get you started:

- Read the specification

The user facing api has been designed to be interchangeable, so users can easily switch their existing project using an image processing server to use imagetools or vice-versa! That's why [the specificatio](docs/spec.md) clearly states what transformations and behaviour an Implementation must support to be compatible. You should reference this document to make sure your Integration is compatible with all others.

- Imagetools-core exposes commonly used utility funtions

To make your life easier imagetools-core provides utility functions for the common tasks like generating cache keys, loading images etc. Have a look at the [api docs]()!

- Use buildtool specific systems

Users expect their buildtools output to be consistent, so you should always choose the system provided by the builtools rather than building your own. This includes warnings (e.g. rollup and vite have the `this.warn` function) and caching.

- Avoid caching on disk

Images are big in comparison to other assets in a website, so you should be very careful when caching images on disk since the cache will - most likely - quickly baloon in size and no one likes that!
Since transformations are deterministic (meaning they produce the same image given the same config) you should leverage the browsers or builtools cache whenever possible.

- Link to this repository

Whenever you build an something with imagetools-core, make sure to link back to this repository. This will allow your users to read the docs provided by this repo. If your integration is popular or for a popular buildtool you can also ask to have your package moven into this monorepo, so your code stays maintained.

- Reexport the directives when possible

both vite-imagetools and rollup-plugin-imagetools reexport all builtin directives, so users can create their own directives using the builtins as building blocks. You should - whenever possible - also do the same so users can profit from the extensible nature of imagetools.