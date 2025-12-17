import React from 'react'

export default function CartItem({ item, onRemove }) {
  return (
    <li className="cart-item">
      <img src={item.image} alt={item.title} />
      <div className="meta">
        <div className="title">{item.title}</div>
        <div className="row">
          <div>Qty: {item.quantity}</div>
          <div>${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      </div>
      <button className="remove" onClick={onRemove}>Remove</button>
    </li>
  )
}
