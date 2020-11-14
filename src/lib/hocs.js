import React from 'react'

export const branch = (test, LeftComponent) => BaseComponent => {
  const Branch = props => {
    if (test(props)) {
      return <LeftComponent {...props} />
    }
    return <BaseComponent {...props} />
  }

  return Branch
}

export const RenderNothing = () => null
