'use strict'

const test = require('tape')
const match = require('.')

test('patterns can be an array or string', function (t) {
  t.same(match(['a'], ['a']), ['a'])
  t.same(match(['a'], 'a'), ['a'])
  t.end()
})

test('patterns are case-insensitive', function (t) {
  t.same(match(['a'], ['A']), ['a'])
  t.end()
})

test('dedupes results', function (t) {
  t.same(match(['a', 'b', 'a'], ['a']), ['a'])
  t.same(match(['a', 'b', 'a']), ['a', 'b'])
  t.same(match(['a', 'b', 'a'], ['a', 'a']), ['a'])
  t.end()
})

test('returns empty array if patterns is empty', function (t) {
  t.same(match(['a'], []), [])
  t.end()
})

test('returns empty array if list is empty', function (t) {
  t.same(match([], []), [])
  t.same(match([], ['a']), [])
  t.end()
})

test('returns full array if patterns is nullish', function (t) {
  t.same(match(['a', 'b']), ['a', 'b'])
  t.same(match(['a', 'b'], null), ['a', 'b'])
  t.end()
})

test('returns full array if pattern is *', function (t) {
  t.same(match(['a', 'b', 'a.a'], '*'), ['a', 'b', 'a.a'])
  t.end()
})

test('list must be an array', function (t) {
  t.plan(1)

  try {
    match()
  } catch (err) {
    t.same(err.message, 'First argument "list" must be an array')
  }
})

test('matches namespace separated by dots', function (t) {
  t.same(match(['a.a', 'a.b', 'b.a', 'axa'], 'a.*'), ['a.a', 'a.b'])
  t.end()
})

test('matches nested namespaces', function (t) {
  t.same(match(['a.a.a', 'a.a.b', 'a.b', 'x.a.b'], 'a.*'), ['a.a.a', 'a.a.b', 'a.b'])
  t.end()
})
