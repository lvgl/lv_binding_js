
function validateString(value, name) {
    if (typeof value !== 'string')
      throw new Error("");
}

function validateObject () {}

module.exports = {
  validateString,
  validateObject
}