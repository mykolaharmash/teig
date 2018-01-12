const {
  NODE_DOCUMENT,
  NODE_DOCTYPE,
  NODE_TAG,
  NODE_TEXT,
  NODE_COMMENT,
  NODE_SCRIPT,
  NODE_STYLE
} = require('hyntax/lib/constants/ast-nodes')

function serializeTagNode (node, serializedChildren) {
  let attributes = serializeTagAttributes(node.content.attributes)

  if (attributes !== '') {
    attributes = ` ${ attributes }`
  }

  if (node.content.selfClosing) {
    return `<${ node.content.name }${ attributes }/>`
  }

  return (
    `<${ node.content.name }${ attributes }>` +
    serializedChildren +
    `</${ node.content.name }>`
  )
}

function serializeTagAttributes (attributes = []) {
  return attributes.map((item) => {
    let serialized = ''

    if (item.key !== undefined) {
      serialized += item.key.content
    }

    if (item.value !== undefined) {
      serialized += `="${ item.value.content }"`
    }

    return serialized
  }).join(' ')
}

function serializeTextNode (node) {
  return node.content.value.content
}

function serializeNode (node, serializedChildren = '') {
  switch (node.nodeType) {
    case NODE_DOCUMENT: {
      return serializedChildren
    }

    case NODE_DOCTYPE: {
      return ''
    }

    case NODE_TAG: {
      return serializeTagNode(node, serializedChildren)
    }

    case NODE_TEXT: {
      return serializeTextNode(node, serializedChildren)
    }

    case NODE_COMMENT: {
      return ''
    }

    case NODE_SCRIPT: {
      return ''
    }

    case NODE_STYLE: {
      return ''
    }

    default: {
      throw new Error(
        `Unexpected node type for serialization: ${ node.nodeType }`
      )
    }
  }
}

module.exports = serializeNode
