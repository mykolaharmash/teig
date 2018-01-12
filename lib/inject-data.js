function injectData (template, data = {}) {
  if (template === undefined) {
    throw new Error('No template was provided for rendering')
  }

  let renderedHtml = template

  Object.keys(data).forEach((key) => {
    const value = data[key]
    const pattern = new RegExp(`{{\\s*${ key }\\s*}}`, 'g')

    renderedHtml = renderedHtml.replace(pattern, value)
  })

  return renderedHtml
}

module.exports = injectData
