import React from 'react'
import { createRoot } from 'react-dom/client'
import CartApp from './CartApp'

const rootEl = document.getElementById('root')
if (rootEl) {
  const root = createRoot(rootEl)
  root.render(<CartApp />)
}
