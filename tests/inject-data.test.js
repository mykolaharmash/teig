const test = require('ava')

const injectData = require('../lib/inject-data')

test('throws if template is not provided', (t) => {
  t.throws(() => injectData())
})

test('replaces matched data keys with corresponding value', (t) => {
  const template = `{{ foo }}`
  const data = { foo: 111 }
  const resultStub = '111'

  const result = injectData(template, data)

  t.is(result, resultStub)
})

test('replaces multiple data keys', (t) => {
  const template = `
    {{ foo }}
    bar
    {{ baz }}
  `
  const data = { foo: 111, baz: 222 }
  const resultStub = `
    111
    bar
    222
  `

  const result = injectData(template, data)

  t.is(result, resultStub)
})

test('replaces matched data keys with with no spaces around the key', (t) => {
  const template = `{{foo}}`
  const data = { foo: 111 }
  const resultStub = '111'

  const result = injectData(template, data)

  t.is(result, resultStub)
})

test('does not touch unknown data keys', (t) => {
  const template = `{{ foo }} {{ bar }}`
  const data = { bar: 111 }
  const resultStub = '{{ foo }} 111'

  const result = injectData(template, data)

  t.is(result, resultStub)
})
