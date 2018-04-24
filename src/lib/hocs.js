import { createFactory } from 'react'

const identity = Component => Component

export const branch = (test, left, right = identity) => BaseComponent => {
  let leftFactory
  let rightFactory

  const Branch = props => {
    if (test(props)) {
      leftFactory = leftFactory || createFactory(left(BaseComponent))
      return leftFactory(props)
    }
    rightFactory = rightFactory || createFactory(right(BaseComponent))
    return rightFactory(props)
  }

  return Branch
}

export const renderComponent = Component => _ => {
  const factory = createFactory(Component)
  const RenderComponent = props => factory(props)
  return RenderComponent
}

export const renderNothing = _ => () => null
