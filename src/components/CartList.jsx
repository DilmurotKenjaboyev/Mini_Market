import React from 'react'
import CartItem from './CartItem'

export default function CartList({ items, onRemove }) {
  if (!items.length) return <div className="empty">Cart is empty</div>
  return (
    <ul className="cart-list">
      {items.map(item => (
        <CartItem key={item.id} item={item} onRemove={() => onRemove(item.id)} />
      ))}
    </ul>
  )
}
