import React, { useState, useEffect } from 'react'

export default function Timer(props) {
    const [time, setTime] = useState(0)
    const [reset, setReset] = useState(false)
    
    useEffect(() => {
        if(reset){
            setTime(0)
            setReset(prevReset => !prevReset)
        }

      let interval;
      if (!props.tenzies){
        interval = setInterval(() => {
            setTime(prevTime => prevTime + 10)
        }, 10)
      } else{
        clearInterval(interval)
        setReset(prevReset => !prevReset)
      }
      return () => clearInterval(interval)
    }, [props.tenzies])
    

  return (
    <div>
        <span className='instructions timer'>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span className='instructions timer'>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
    </div>
  )
}
