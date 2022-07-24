import "./App.css";
import Die from "./components/Die";
import _, { random } from "lodash";
import React from "react"

function App() {

  const [dice, setDice] = React.useState(radomizeDiceData());
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    setTenzies( () => {
      if (checkTenzies()) {
        console.log("winner winner chicken dinner")
      }

      return checkTenzies()
    })
  }, [dice])

  function checkTenzies() {
    const isAllHeld =  dice.every(({isHeld, value}) => {
      return (isHeld === true)
    });

    const dieValueSum = dice.reduce((sum, die) => {
      return sum + die.value
    }, 0);

    const isSameVal = dieValueSum / dice.length;

    return isSameVal && isAllHeld;
  }

  function radomizeDiceData() {
    const newDiceData = [...Array(10)].map((element, index) => {
      return (
        {
          id: index + 1,
          value: _.random(1, 6),
          isHeld: false
        }
      )
    })
    return newDiceData;
  }

  const diceElements = dice.map(({id, value, isHeld}) => {
    return <Die id = {id} value = {value} isHeld = {isHeld} toggleHold = {holdDice}/>
  })

  function updateDiceData() {
    const newDiceData = dice.map((die) => {
      return (
        {
          ...die,
          value: die.isHeld ? die.value : _.random(1, 6)
        }
      )
    })
    return newDiceData;
  }

  function holdDice(id) {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return ({
          ...die,
          isHeld: id === die.id ? !die.isHeld : die.isHeld
        })
      })
    })
  }

  const handleButtonClick = () => {
    setDice(updateDiceData());
  }




  return (
    <main className="board-container">
      <div className="dice-container">
        {diceElements}
      </div>
      <button onClick = {handleButtonClick} className="random-dice-btn">Roll</button>
    </main>
  );
}

export default App;
