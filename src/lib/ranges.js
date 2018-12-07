export const getRanges = ({ node, ancestors }) => {
  const parents = [].concat(ancestors).reverse()
  const ranges = parents.map((parent, index, all) => {
    const child = all[index + 1] || node
    return parent.children.indexOf(child)
  })

  return ranges
}
