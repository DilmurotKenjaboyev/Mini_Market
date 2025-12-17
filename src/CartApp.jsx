import React, { useEffect, useState } from 'react'
import CartList from './components/CartList'

const STORAGE_KEY = 'mini_marketplace_cart_v1'

export default function CartApp() {
  const [cart, setCart] = useState([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setCart(JSON.parse(raw))
    } catch (e) {
      console.warn('Failed to read cart from localStorage', e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
    } catch (e) {
      console.warn('Failed to save cart', e)
    }
  }, [cart])

  useEffect(() => {
    const handler = (e) => addToCart(e.detail)
    window.addEventListener('add-to-cart', handler)
    return () => window.removeEventListener('add-to-cart', handler)
  }, [cart])

  function addToCart(product) {
    setCart(prev => {
      const found = prev.find(i => i.id === product.id)
      if (found) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { id: product.id, title: product.title, price: product.price, image: product.image, quantity: 1 }]
    })
  }

  function removeFromCart(id) {
    setCart(prev => prev.filter(i => i.id !== id))
  }

  const totalCount = cart.reduce((s, it) => s + it.quantity, 0)
  const totalSum = cart.reduce((s, it) => s + it.quantity * it.price, 0)

  return (
    <div className="cart-app">
      <div className="cart-summary">
        <div><strong>Items:</strong> {totalCount}</div>
        <div><strong>Total:</strong> ${totalSum.toFixed(2)}</div>
      </div>

      <CartList items={cart} onRemove={removeFromCart} />
    </div>
  )
}
