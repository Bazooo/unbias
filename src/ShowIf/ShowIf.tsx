import React from 'react'

type ShowIfCondition = boolean | (() => boolean)

interface ShowIfProps {
  condition: ShowIfCondition
  children: React.ReactElement<ShowIfElement> | React.ReactElement<ShowIfElement>[]
}

const ShowIf = ({ condition, children }: ShowIfProps) => {
  let trueChild: React.ReactElement<ShowIfElement> | null = null
  let elseChild: React.ReactElement<ShowIfElement> | null = null
  const falseChildren: React.ReactElement<ShowIfElement>[] = []

  // The rendered children
  let renderedChildren: JSX.Element | null = null

  if (Array.isArray(children)) {
    children.forEach((child, i) => {
      const matchType = child.type.toString().match(/([A-Z])\w+/)
      const childType = matchType && matchType[0]

      switch (childType) {
        case 'IS_TRUE':
          trueChild = child
          break
        case 'IS_FALSE_AND':
          falseChildren.push(child)
          break
        case 'OR_ELSE':
          elseChild = child
          break
        default:
          throw new Error(`ShowIf child[${i}] is invalid!`)
      }
    })
  } else {
    const matchType = children.type.toString().match(/([A-Z])\w+/)
    const childType = matchType && matchType[0]
    switch (childType) {
      case 'IS_TRUE':
        trueChild = children
        break
      case 'IS_FALSE_AND':
        falseChildren.push(children)
        break
      case 'OR_ELSE':
        elseChild = children
        break
      default:
        throw new Error(`ShowIf child is invalid!`)
    }
  }

  if (conditionCheck(condition)) {
    renderedChildren = trueChild && trueChild.props.children
  } else {
    const goodFalseChildren = falseChildren.filter(falseChild => conditionCheck(falseChild.props.condition)).map(falseChild => falseChild.props.children)

    if (goodFalseChildren.length > 0) {
      renderedChildren = <>{goodFalseChildren}</>
    } else {
      renderedChildren = elseChild && elseChild.props.children
    }
  }

  return <>{renderedChildren}</>
}

const conditionCheck = (condition?: ShowIfCondition) => {
  if (typeof condition === 'function') {
    return condition()
  } else {
    return condition
  }
}

interface ShowIfElement {
  condition?: ShowIfCondition
  children: JSX.Element
}

export const IsTrue = ({ children }: ShowIfElement) => {
  const {} = 'IS_TRUE'
  return children
}

export const IsFalseAnd = ({ children }: ShowIfElement) => {
  const {} = 'IS_FALSE_AND'
  return children
}

export const OrElse = ({ children }: ShowIfElement) => {
  const {} = 'OR_ELSE'
  return children
}

export default ShowIf
