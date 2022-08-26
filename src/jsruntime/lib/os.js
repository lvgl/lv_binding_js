const os = globalThis.SJSJSBridge.os
globalThis.SJSJSBridge.os = null

function type () {
    return os.uname().machine
}

function homedir () {
    return os.homedir()
}

function tmpdir () {
    return os.tmpdir()
}

function cpus () {
    return os.cpuInfo()
}

function loadavg () {
    return os.loadavg()
}

function hostname () {
    return os.gethostname()
}

function userInfo () {
    return os.userInfo()
}

module.exports = {
    type,
    homedir,
    tmpdir,
    cpus,
    loadavg,
    hostname,
    userInfo
}