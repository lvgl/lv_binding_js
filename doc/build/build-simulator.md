# Simulator Build Guide
This guide gives an overview on how to build lvgljs running with SDL simulator.
This should work the same for both Linux and macOS.

Take a look at the [txiki readme](https://github.com/saghul/txiki.js#building)
for the required dependencies.
You will need to install them, since we depend on txiki for the JavaScript runtime.

Besides that you will need to install sdl2 and [Node.js](https://nodejs.org/en/download/package-manager)

> [!TIP]
> On some distributions, like Ubuntu, you might need to install the `libsdl2-dev` package as well

The [`Makefile`](../../Makefile) of this repository contains some useful shortcuts:
- `make setup` will initialize the git submodules and install the necessary npm packages
- `make demo` will build the simulator and run the widgets demo

## Manual approach
You can build the simulator with `make simulator`, which will then be available in the `build/` directory.

Run `node build.js` to create `*.js` files from the `*.jsx` files in the `test/` and `demo/` directories.
You can then run any of them with:
```sh
./build/lvgljs run test/button/2/index.js
```
