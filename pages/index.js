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

    <style jsx global>
      {`
        body {
          text-align: center;
          font-family: -apple-system, sans-serif;
        }

        .container {
          width: 1060px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        button {
          background: #00ad9f;
          border-radius: 4px;
          font-weight: 700;
          color: #fff;
          border: none;
          padding: 7px 15px;
          margin-left: 8px;
          cursor: pointer;
        }

        button:hover {
          background: #008378;
        }

        button:focus {
          outline: 0;
        }

        #cards {
          width: 1060px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
        }

        .card {
          width: 160px;
          height: 160px;
          margin-bottom: 20px;
        }

        .card:not(:nth-child(6n)) {
          margin-right: 20px;
        }

        .c {
          position: absolute;
          max-width: 160px;
          max-height: 160px;
          width: 50ch;
          height: 50ch; 
          cursor: pointer;
          will-change: transform, opacity;
        }

        .front,
        .back {
          background-size: cover;
        }
        
        .back {
          background-image: url(https://images.unsplash.com/photo-1544511916-0148ccdeb877?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1901&q=80i&auto=format&fit=crop);
        }

        .front {
          background-image: url(https://images.unsplash.com/photo-1540206395-68808572332f?ixlib=rb-1.2.1&w=1181&q=80&auto=format&fit=crop);
        }

      `}
    </style>
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
    for (let index = 0; index < options / 2; index++){
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

  if (game.length === 2) {
    if (flippedIndexes.length === 2) {
      const match = game[flippedIndexes[0]].colorId === game[flippedIndexes[1]].colorId

      if (match) {
        const newGame = [...game]
        newGame[flippedIndexes[0]].flipped = true
        newGame[flippedIndexes[1]].flipped = true
        setGame(newGame)

        const newIndexes = [...flippedIndexes]
        newIndexes.push(false)
        setFlippedIndexes(newIndexes)      
      } else {
        const newIndexes = [...flippedIndexes]
        newIndexes.push(true)
        setFlippedIndexes(newIndexes)
      }
    }
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
                flippedIndexes={flippedIndexes}
                setFlippedIndexes={setFlippedIndexes}
              />
            </div>
          ))}
      </div>
    )
  }
}

function Card({
  id,
  color,
  game,
  flippedCount,
  setFlippedCount,
  flippedIndexes,
  setFlippedIndexes
}) {
  const [flipped, set] = useState(false)
  const {transform, opacity} = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: {mass: 5, tension: 500, friction: 80},
  })

  useEffect(() => {
    if (flippedIndexes[2] === true && flippedIndexes.indexOf(id) > -1) {
      setTimeout(() => {
        set(state => !state)
        setFlippedCount(flippedCount + 1)
        setFlippedIndexes([])
      }, 1000)
    } else if (flippedIndexes[2] === false && id === 0) {
      setFlippedCount(flippedCount + 1)
      setFlippedIndexes([])
    }
  }, [flippedIndexes])

  const onCardClick = () => {
    if (!game[id].flipped && flippedCount % 3 === 0) {
      set(state => !state)
      setFlippedCount(flippedCount + 1)
      const newIndexes = [...flippedIndexes]
      newIndexes.push(id)
      setFlippedIndexes(newIndexes)
    } else if (
      flippedCount % 3 === 1 &&
      !game[id].flipped &&
      flippedIndexes.indexOf(id) < 0
    ) {
      set(state => !state)
      setFlippedCount(flippedCount + 1)
      const newIndexes = [...flippedIndexes]
      newIndexes.push(id)
      setFlippedIndexes(newIndexes)
    }
  }

  return (
    <div onClick={onCardClick}>
      <a.div
        className="c back"
        style={{
          opacity: opacity.interpolate(o => 1 - o),
          transform,
        }}
      />
      <a.div
        className="c front"
        style={{
          opacity,
          transform: transform.interpolate(t => `${t} rotateX(180deg)`),
          background: color,
        }}
      />
  </div>
  )
}