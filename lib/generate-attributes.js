function generateAttributes (attributes = []) {
  return attributes.reduce((result, attr) => {
    if (attr.key === undefined) {
      return result
    }

    let value = ''

    if (attr.value !== undefined) {
      value = attr.value.content
    }

    result[attr.key.content] = value

    return result
  }, {})
}

module.exports = generateAttributes
