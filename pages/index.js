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
      <div className="container">
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
          )}
        </div>
      </div>

      {
        options ? (
          <MemoryGame
            options={options}
            setOptions={setOptions}
            highScore={highScore}
            setHighScore={setHighScore}/>
        ) : (
          <h2>Choose a difficulty to begin!</h2>
        )}

    </div>
  )
}

function MemoryGame({options, setOptions, highScore, setHighScore}){
  const [game, setGame] = useState([])
  const [flippedCount, setFlippedCount] = useState(0)
  const [flippedIndexes, setFlippedIndexes] = useState([])

  const colors = [
    '#ecdb54',
    '#e34132',
    '#6ca0dc',
    '#944743',
    '#dbb2d1',
    '#ec9787',
    '#00a68c',
    '#645394',
    '#6c4f3d',
    '#ebe1df',
    '#bc6ca7',
    '#bfd833'
  ]

  useEffect(() => {
    const newGame = []
    for(let index = 0; index < options / 2; index++){
      const firstOption = {
        id: 2 * index,
        colorId: index,
        color: colors[index],
        flipped: false
      }
      const secondOption = {
        id: 2 * index + 1,
        colorId: index,
        color: colors[index],
        flipped: false
      }

      newGame.push(firstOption)
      newGame.push(secondOption)
    }

    const shuffledGame = newGame.sort(() => Math.random() - 0.5)
    setGame(shuffledGame)
  }, [])

  useEffect(() => {
    //Loads when the game variable changes
  }, [game])

  if(game.length === 2) {
    //Runs if 2 cards have been flipped
  }

  if(game.length === 0) {
    return <div>Loading...</div>
  }
  else {
    return (
      <div id="cards">
        {
          game.map((card, index) => (
            <div className="card" key={index}>
              <Card
                id={index}
                color={card.color}
                game={game}
                flippedCount={flippedCount}
                setFlippedCount={setFlippedCount}
                flippedIndexes={setFlippedIndexes}
                setFlippedIndexes={setFlippedIndexes}
              />
            </div>
          ))}
      </div>
    )
  }
}

function Card(props) {
  return <div>I'm a card</div>
}