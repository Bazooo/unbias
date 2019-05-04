import React from 'react'

export type SwitchPrimitive = string | number

export interface SwitchElementProps {
  equals?: SwitchPrimitive
  children: JSX.Element
}

interface SwitchElementType {
  ({ children }: SwitchElementProps): JSX.Element
  switchElementType: 'CASE' | 'DEFAULT_CASE'
}

type SwitchElement = React.ReactElement<SwitchElementProps, SwitchElementType>

interface SwitchProps {
  statement: SwitchPrimitive | (() => SwitchPrimitive)
  children: SwitchElement | SwitchElement[]
}

const Switch = ({ children, statement }: SwitchProps) => {
  const childArray = Array.isArray(children) ? children : [children]

  let caseChild: JSX.Element | null = null
  let defaultChild: JSX.Element | null = null

  childArray.forEach((child, i) => {
    if (caseChild) {
      return
    }

    switch (child.type.switchElementType) {
      case 'CASE':
        if (child.props.equals === statement) {
          caseChild = child.props.children
        }
        break
      case 'DEFAULT_CASE':
        defaultChild = defaultChild || child.props.children
        break
      default:
        throw new Error(`Switch child[${i}] is invalid!`)
    }
  })

  return <>{caseChild || defaultChild}</>
}

export default Switch
