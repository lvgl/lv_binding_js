const { Module } = require('internal/modules/loader');
const path = require('path');

Module._initPaths();

function executeUserEntryPoint(main = process.argv[1]) {
    Module._load(path.resolve(process.cwd(), main), null, true);
}

executeUserEntryPoint()