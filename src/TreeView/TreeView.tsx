import React from 'react'

interface TreeViewProps {
  children: React.ReactNode
}

const context = {
  text: 'test'
}

const createTreeView = (Context?: React.Context<any>) => ({ children }: TreeViewProps) => {
  if (Context) {
    return (
      <Context.Provider value={context}>{children}</Context.Provider>
    )
  } else {
    return <>{children}</>
  }
}

export default createTreeView
