import React from 'react'

export default function Die(props) {
  return (
    <div className={`die ${props.isHeld && "held"}`} onClick={() => props.holdDie(props.id)}>
        <h2 className='die--number'>{props.value}</h2>
    </div>
  )
}
