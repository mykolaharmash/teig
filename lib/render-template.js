const injectData = require('./inject-data')
const expandComponents = require('./expand-components')

function renderTemplate (template, templateData = {}, componentsMap = {}) {
  const html = injectData(template, templateData)

  return expandComponents(html, componentsMap)
}

module.exports = renderTemplate
