const { Module } = require('internal/modules/loader');
const path = require('path');
const fs = require('fs');

Module._initPaths();

function executeUserEntryPoint(main = process.argv[1]) {
    file = path.resolve(process.cwd(), main);
    Module._load(file, null, true);
    fs.watch(file, (eventType, filename) => {
        if (eventType !== 2) return;
        delete Module._cache[filename];
        Module._load(filename, null, true);
        executeUserEntryPoint()
    });
}

executeUserEntryPoint()
