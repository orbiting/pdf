import React from 'react'
import { Link } from '@react-pdf/core'

const Anchor = ({ children, href }) => (
  <Link src={href}>{children}</Link>
)

export default Anchor
