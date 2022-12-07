import { useState, useEffect } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Timer from './components/Timer'

function App() {
  const [dice, setDice] = useState(generateAll())
  const [tenzies, setTenzies] = useState(false)
  const [roll, setRoll] = useState(0)
  const [highScore, setHighScore] = useState(localStorage.getItem("best") || 1000)

  useEffect(() => {
      const everyHeld = dice.every(die => die.isHeld)
      const firstNumber = dice[0].value
      const everySame = dice.every(die => die.value === firstNumber)
      if(everyHeld && everySame){
        setTenzies(true)
      } else {
        setTenzies(false)
      }
  }, [dice])

  useEffect(() => {
    if(roll < highScore && tenzies) {
      localStorage.setItem("best", roll)
      setHighScore(localStorage.getItem("best"))
    }
  }, [tenzies])
  
  

  function generateAll(){
    const newDice=[]
    for(let i = 0; i < 10; i++){
      newDice.push(generateDie())
    }
    return newDice
  }

  function generateDie(){
    return(
      {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
    )
  }

  const diceElements = dice.map(die => {
    return(
      <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDie={holdDie} id={die.id}/>
    )
  })

  function rollDice(){
    if(tenzies){
      setTenzies(false)
      setDice(generateAll())
      setRoll(0)
    } else{
      setRoll(prevRoll => prevRoll + 1)
      setDice(prevDice => prevDice.map(die => {
        return(
          die.isHeld ? {...die} :
          generateDie()
        )
      }))
    }
  }

  function holdDie(id){
    setDice(prevDice => prevDice.map(die => {
      return(
        die.id === id ? {...die, isHeld: !die.isHeld} :
        {...die}
      )
    }))
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h5 className='instructions score'>Rolls: {roll}</h5>
      <h5 className='instructions score'>Highscore: {highScore === 1000 ? "Not set" : highScore}</h5>
      <Timer tenzies={tenzies}/>
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>Roll until all dice are the same. 
         Click each die to freeze it at its current value between rolls.</p>
      <div className="dice--container">
        {diceElements}
      </div>
      <button className='roll--dice' onClick={rollDice}>
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  )
}

export default App
