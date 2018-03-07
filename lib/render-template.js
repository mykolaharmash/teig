const injectData = require('./inject-data')
const expandComponents = require('./expand-components')

function renderTemplate (
  template,
  templateData = {},
  componentsMap = {},
  componentHandler = () => {}
) {
  const html = injectData(template, templateData)

  if (Object.keys(componentsMap).length === 0) {
    return html
  }

  return expandComponents(html, componentsMap, componentHandler)
}

module.exports = renderTemplate
