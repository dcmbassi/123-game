import React from 'react'
import { useGame } from '../context/gameContext'

const Endgame = () => {
    const {won} = useGame()
    if (won) return (
        <p className='winner'>Congratulations! You win!!!</p>  
    )
    return (<p>Game over. You lose.</p>)

}

export default Endgame
