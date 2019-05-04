import React from 'react'

type ShowIfCondition = boolean | (() => boolean)

export interface ShowIfElementProps {
  condition?: ShowIfCondition
  children: JSX.Element
}

interface ShowIfElementType {
  (): any
  showElementType: 'IS_TRUE' | 'IS_FALSE_AND' | 'OR_ELSE'
}

type ShowIfElement = React.ReactElement<ShowIfElementProps, ShowIfElementType>

interface ShowIfProps {
  condition: ShowIfCondition
  children: ShowIfElement | ShowIfElement[]
}

const ShowIf = ({ condition, children }: ShowIfProps) => {
  let trueChild: React.ReactElement<ShowIfElementProps> | null = null
  let elseChild: React.ReactElement<ShowIfElementProps> | null = null
  const falseChildren: React.ReactElement<ShowIfElementProps>[] = []

  // The rendered children
  let renderedChildren: JSX.Element | null = null

  if (Array.isArray(children)) {
    children.forEach((child, i) => {
      switch (child.type.showElementType) {
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
    switch (children.type.showElementType) {
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

export default ShowIf
