# Monorepo README

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) v16.19
- [Yarn](https://yarnpkg.com/getting-started/install) v3.4.1

## Installation

`yarn install`

## Generating files

Before you can run the project, you need to generate some files (hardhat export for solidity and wagmi/cli generate for the frontend).

1.  Generate solidity files, run:

`yarn core:generate`

2.  Generate webapp files, run:

`yarn web:generate`

## Running the hardhat local server

1.  Start the hardhat local server by running:

`yarn run core:dev`

## Running the Next.js frontend

1.  Start the Next.js frontend by running:

`yarn run web:dev`
