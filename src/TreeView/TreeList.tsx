import React, { useState, useContext, useEffect } from 'react'

interface TreeListProps<T> {
  opened?: boolean
  children: React.ReactNode
  content?: T
}

export interface TreeListTarget<T> {
  toggleList: () => void
  active?: boolean
  content?: T
}

type TreeList<T> = (treeListProps: TreeListProps<T>) => JSX.Element

const createTreeList = <T extends any>(TreeListTarget: React.FunctionComponent<TreeListTarget<T>>, context?: React.Context<any>): TreeList<T> => {
  if (context) {
    return ({ opened = false, content, children }) => {
      const treeContext = useContext(context)
      const [open, toggle] = useState(opened)

      const toggleOpen = () => {
        toggle(!open)
      }

      return (
        <>
          <TreeListTarget content={content} toggleList={toggleOpen} active={open} />
          {open ? children : null}
        </>
      )
    }
  }

  return ({ opened = false, content, children }) => {
    const [open, toggle] = useState(opened)

    const toggleOpen = () => {
      toggle(!open)
    }

    return (
      <>
        <TreeListTarget content={content} toggleList={toggleOpen} active={open} />
        {open ? children : null}
      </>
    )
  }
}

export default createTreeList
