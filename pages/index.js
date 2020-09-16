import React, {useState, useEffect} from "react";
import {useSpring, animated as a} from "react-spring";

export default function App() {
  const [options, setOptions] = useState(null)
  const [highScore, setHighScore] = useState(0)

  useEffect(() =>{
    //Load when game starts
  }, [])

  return (
    <div>
      <div className = "container">
        <h1>Memory Game</h1>
        <div>High Score: {highScore}</div>
        <div>
          { options === null? (
            <>
              <button onClick={() => {setOptions(12)}}>Easy</button>
              <button onClick={() => {setOptions(18)}}>Medium</button>
              <button onClick={() => {setOptions(24)}}>Hard</button>
            </>
          ) : (
            <>
              <button onClick={() => {
                  const previousOptions = options
                  setOptions(null)
                  setTimeout(() => {
                    setOptions(previousOptions)
                  }, 5)
                }}
              >
              Start Over
              </button>
              <button onClick={() => setOptions(null)}>Main Menu</button>
            </>
          )
        }
        </div>
      </div>
    </div>
  )
}