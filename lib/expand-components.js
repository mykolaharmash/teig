const { tokenize, constructTree } = require('hyntax')
const { NODE_TAG } = require('hyntax/lib/constants/ast-nodes')

const serializeNode = require('./serialize-node')
const generateAttributes = require('./generate-attributes')

function renderNode (node, componentsMap) {
  const componentNames = Object.keys(componentsMap)
  let serializedChildren

  if (node.content.children) {
    serializedChildren = renderNodesList(node.content.children, componentsMap)
  }

  if (
    node.nodeType === NODE_TAG
    && componentNames.includes(node.content.name)
  ) {
    const component = new componentsMap[node.content.name]()
    const attributes = generateAttributes(node.content.attributes)

    return component.render(
      attributes,
      serializedChildren || ''
    )
  } else {
    return serializeNode(node, serializedChildren)
  }
}

function renderNodesList (nodes, componentsMap) {
  return nodes
    .map((node) => renderNode(node, componentsMap))
    .join('')
}

function expandComponents (html, componentsMap = {}) {
  if (html === undefined) {
    throw new Error('No HTML string provided to parse and expand components')
  }

  const { tokens } = tokenize(html)
  const { ast } = constructTree(tokens)

  return renderNode(ast, componentsMap)
}

module.exports = expandComponents
