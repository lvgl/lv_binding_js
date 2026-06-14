# Simulator Build Guide

This guide covers building lvgljs with the SDL simulator on **Linux**, **macOS**, and **Windows**.

## Setup

You will need:

- [cmake](https://cmake.org/) (3.16+)
- [SDL2](https://www.libsdl.org/)
- [Node.js](https://nodejs.org/) (for JS bundles)
- git submodules initialized

Then install npm/yarn dependencies:

```bash
git submodule update --recursive --init
yarn install
```

Or use `make setup` on Linux/macOS (`git submodule update --recursive --init` + `npm install`).

### Linux

```bash
sudo apt install cmake ninja-build nodejs libsdl2-dev libffi-dev libcurl4-openssl-dev
```

### macOS

```bash
brew install cmake sdl2 libffi curl node ninja
```

### Windows

Building on Windows requires **Visual Studio 2022** (or Build Tools) with the **Desktop development with C++** workload, plus **CMake**, **Ninja**, **Node.js**, and **vcpkg**.

Install and bootstrap [vcpkg](https://github.com/microsoft/vcpkg):

```powershell
git clone https://github.com/microsoft/vcpkg.git
cd vcpkg
.\bootstrap-vcpkg.bat
```

Install native dependencies (static triplet recommended):

```powershell
.\vcpkg install curl:x64-windows-static zlib:x64-windows-static libffi:x64-windows-static sdl2:x64-windows-static
```

Set `VCPKG_ROOT` to your vcpkg checkout (adjust the path):

```powershell
$env:VCPKG_ROOT = "C:\path\to\vcpkg"
```

## Build the simulator

### Linux / macOS

```bash
make simulator
```

This runs:

```bash
cmake -B build -DCMAKE_BUILD_TYPE=Release -DBUILD_LVGL_SIMULATOR=ON
cmake --build build -j
```

The binary is `build/lvgljs`.

### Windows

Run from **Developer PowerShell for VS 2022** or **x64 Native Tools Command Prompt** (so MSVC and Ninja are on `PATH`):

```powershell
cmake -B build/x64-pc-windows-msvc -G Ninja `
  -DCMAKE_BUILD_TYPE=Release `
  -DBUILD_LVGL_SIMULATOR=ON `
  -DCMAKE_TOOLCHAIN_FILE="$env:VCPKG_ROOT/scripts/buildsystems/vcpkg.cmake" `
  -DVCPKG_TARGET_TRIPLET=x64-windows-static

cmake --build build/x64-pc-windows-msvc
```

The binary is `build/x64-pc-windows-msvc/lvgljs.exe`.

To rebuild after C++ changes:

```powershell
cmake --build build/x64-pc-windows-msvc
```

If the build fails because MSVC is not on `PATH`, open a Developer shell or run `vcvars64.bat` first.

## JS bundles

Before running demos or tests, bundle the JavaScript:

```bash
yarn bundle
```

If you edited TypeScript under `src/render/react/`, run the full pipeline instead - see [JS bundle build notes](./js-bundle.md).

## Running the demo

Demos live under `demo/`.

### Linux / macOS

```bash
make demo
```

Runs the `widgets` demo by default. For another demo:

```bash
make demo PROJECT=calculator
```

### Windows

```powershell
yarn bundle
.\build\x64-pc-windows-msvc\lvgljs.exe run .\demo\widgets\index.js
```

Replace `widgets` with `calculator`, `hello_world`, etc.

## Running other projects

1. Build the simulator (see above).
2. Bundle JS: `yarn bundle` (or `yarn build` after `src/render/react` edits).
3. Run a bundled entry:

```bash
# Linux / macOS
./build/lvgljs run test/button/2/index.js
```

```powershell
# Windows
.\build\x64-pc-windows-msvc\lvgljs.exe run test\button\2\index.js
```

### Watch mode (Linux / macOS / Windows)

Open two terminals:

| Terminal 1 | Terminal 2 |
| --- | --- |
| `yarn bundle:watch` | `npm run sim:watch -- test/button/2/index.js` |

On Windows, point `sim:watch` at the `.exe` by running the binary directly if needed:

```powershell
.\build\x64-pc-windows-msvc\lvgljs.exe run test\button\2\index.js
```
