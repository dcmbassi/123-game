import React from 'react'
import { useGame } from '../context/gameContext'

const Header = () => {
    const {initGame} = useGame()
    return (
        <header>
          <h1 className='title'>123 Game</h1>
          <button className='main-btn' onClick={initGame}>New Game</button>
        </header>
    )
}

export default Header
