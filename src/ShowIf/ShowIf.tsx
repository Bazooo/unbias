import React from 'react'

type ShowIfCondition = boolean | (() => boolean)

export interface ShowIfElementProps {
  condition?: ShowIfCondition
  children: JSX.Element
}

interface ShowIfElementType {
  ({ children }: ShowIfElementProps): JSX.Element
  showElementType: 'IS_TRUE' | 'IS_FALSE_AND' | 'OR_ELSE'
}

type ShowIfElement = React.ReactElement<ShowIfElementProps, ShowIfElementType>

interface ShowIfProps {
  condition: ShowIfCondition
  children: ShowIfElement | ShowIfElement[]
}

interface ShowIfChildren {
  trueChild: JSX.Element | null
  elseChild: JSX.Element | null
  falseChildren: JSX.Element[]
}

const ShowIf = ({ condition, children }: ShowIfProps) => {
  const defaultChildren = {
    trueChild: null,
    elseChild: null,
    falseChildren: []
  }

  const childArray = Array.isArray(children) ? children : [children]

  const { trueChild, elseChild, falseChildren } = childArray.reduce((result: ShowIfChildren, child, i) => {
    switch (child.type.showElementType) {
      case 'IS_TRUE':
        return {
          ...result,
          trueChild: child.props.children
        }
      case 'IS_FALSE_AND':
        if (!conditionCheck(child.props.condition)) {
          return result
        }
        return {
          ...result,
          falseChildren: [...result.falseChildren, child.props.children]
        }
      case 'OR_ELSE':
        return {
          ...result,
          elseChild: child.props.children
        }
      default:
        throw new Error(`ShowIf child[${i}] is invalid!`)
    }
  }, defaultChildren)

  const falseOrElse = falseChildren.length > 0 ? falseChildren : elseChild

  const renderedChildren = conditionCheck(condition) ? trueChild : falseOrElse

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
