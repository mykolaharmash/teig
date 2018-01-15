const { tokenize, constructTree } = require('hyntax')
const { NODE_TAG } = require('hyntax/lib/constants/ast-nodes')

const serializeNode = require('./serialize-node')
const generateAttributes = require('./generate-attributes')

function renderNode (node, componentsMap, componentHandler) {
  const componentNames = Object.keys(componentsMap)
  let serializedChildren

  if (node.content.children) {
    serializedChildren = renderNodesList(
      node.content.children,
      componentsMap,
      componentHandler
    )
  }

  if (
    node.nodeType === NODE_TAG
    && componentNames.includes(node.content.name)
  ) {
    const componentConstructor = componentsMap[node.content.name]
    const attributes = generateAttributes(node.content.attributes)

    return componentHandler(componentConstructor, attributes, serializedChildren)
  } else {
    return serializeNode(node, serializedChildren)
  }
}

function renderNodesList (nodes, componentsMap, componentHandler) {
  return nodes
    .map((node) => renderNode(node, componentsMap, componentHandler))
    .join('')
}

function expandComponents (html, componentsMap, componentHandler) {
  if (html === undefined) {
    throw new Error('No HTML string provided to parse and expand components')
  }

  if (componentsMap === undefined) {
    throw new Error(
      'No components map was provided to match custom tag names ' +
      'with associated component functions'
    )
  }

  if (componentHandler === undefined) {
    throw new Error(
      'No component handler function was provided ' +
      'to invoke when custom component is found'
    )
  }

  const { tokens } = tokenize(html)
  const { ast } = constructTree(tokens)

  return renderNode(ast, componentsMap, componentHandler)
}

module.exports = expandComponents
