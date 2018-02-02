const {
  NODE_DOCUMENT,
  NODE_DOCTYPE,
  NODE_TAG,
  NODE_TEXT,
  NODE_COMMENT,
  NODE_SCRIPT,
  NODE_STYLE
} = require('hyntax/lib/constants/ast-nodes')

function serializeDoctypeNode (node) {
  let attributes = serializeDoctypeAttributes(node.content.attributes)

  if (attributes !== '') {
    attributes = ` ${ attributes }`
  }

  return `<!doctype${ attributes }>`
}

function serializeCommentNode (node) {
  return `<!-- ${ node.content.value.content } -->`
}

function serializeTagNode (nodeName, attributes, serializedChildren, selfClosing) {
  let serializedAttributes = serializeTagAttributes(attributes)

  if (serializedAttributes !== '') {
    serializedAttributes = ` ${ serializedAttributes }`
  }

  if (selfClosing) {
    return `<${ nodeName }${ serializedAttributes }/>`
  }

  return (
    `<${ nodeName }${ serializedAttributes }>` +
    serializedChildren +
    `</${ nodeName }>`
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

function serializeDoctypeAttributes (attributes = []) {
  return attributes.map((item) => {
    let wrapper = ''

    if (item.startWrapper !== undefined) {
      wrapper = item.startWrapper
    }

    return `${ wrapper }${ item.value.content }${ wrapper }`
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
      return serializeDoctypeNode(node)
    }

    case NODE_TAG: {
      return serializeTagNode(
        node.content.name,
        node.content.attributes,
        serializedChildren,
        node.content.selfClosing
      )
    }

    case NODE_TEXT: {
      return serializeTextNode(node)
    }

    case NODE_COMMENT: {
      return serializeCommentNode(node)
    }

    case NODE_SCRIPT: {
      return serializeTagNode(
        'script',
        node.content.attributes,
        node.content.value.content,
        false
      )
    }

    case NODE_STYLE: {
      return serializeTagNode(
        'style',
        node.content.attributes,
        node.content.value.content,
        false
      )
    }

    default: {
      throw new Error(
        `Unexpected node type for serialization: ${ node.nodeType }`
      )
    }
  }
}

module.exports = serializeNode
