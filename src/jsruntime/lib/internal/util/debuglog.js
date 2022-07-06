const os = require('os')

let debugLog = console.log
{
	let _debugOptions = os.getenv('DEBUG')
	if (typeof _debugOptions == 'undefined' || _debugOptions.split(',').indexOf('require') === -1) {
		debugLog = function () {}
	}
}

module.exports = {
	debugLog
}