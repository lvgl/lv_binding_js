# Simulator Build Guide
This guide gives an overview on how to build lvgljs running with SDL simulator.
This should work the same for both Linux and macOS.

## Setup
You'll need to install these dependencies:
- [cmake](https://cmake.org/) 
- [sdl2](https://www.libsdl.org/)
- [Node.js](https://nodejs.org/en/download/package-manager)

| Mac | Linux |
| ------- | ------- |
| `brew install cmake sdl2 node` | `sudo apt install cmake nodejs libsdl2-dev` |


Then run `make setup`. This will initialize the git submodules and install the necessary npm packages

## Running the demo

`make demo` will build the simulator and run the widgets demo. Optionally you can add `PROJECT=<demoName>` where `demoName` is the directory in `/demos`, if you want to run a specific project e.g. `make demo PROJECT=calculator`

## Running other projects
1. Build the simulator with `make simulator`, which will then be available in the `build/` directory.
2. Run `node build.js` to generate `*.js` files from the `*.jsx` files in the `test/` and `demo/` directories.
3. Run the simulator with the generated file e.g.:
```sh
./build/lvgljs run test/button/2/index.js
```
