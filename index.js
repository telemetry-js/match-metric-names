'use strict'

const micromatch = require('micromatch')

// TODO (!): allow matching without having to include the common prefix (e.g. telemetry.disk)
module.exports = function (list, patterns) {
  if (!Array.isArray(list)) {
    throw new TypeError('First argument "list" must be an array')
  }

  if (patterns == null) return Array.from(new Set(list))
  if (typeof patterns === 'string') patterns = [patterns]

  list = list.map(dotToSlash)
  patterns = patterns.map(dotToSlash).map(globstarByDefault)

  return micromatch(list, patterns, {
    nocase: true,
    nodupes: true
  }).map(slashToDot)
}

function globstarByDefault (name) {
  return name.replace(/\*+/g, '**')
}

function dotToSlash (name) {
  return name.replace(/\./g, '/')
}

function slashToDot (name) {
  return name.replace(/\//g, '.')
}
