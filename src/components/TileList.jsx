import React from 'react'
import { useEffect } from 'react'

import { useGame } from "../context/gameContext"
import Endgame from './Endgame'
import Tile from "./Tile"

const TileList = () => {
    const {tilesArray, initGame, checkWin, moves, gameOver} = useGame()

    useEffect(() => {
        initGame()
        
    }, [initGame])

    if (moves === 0) {
        
        checkWin()
    }
    return (
        <div className='tile-list'>
            {tilesArray.map(tile => (
                <Tile key={tile.number} value={tile.number} bg={tile.background} />
            ))}

            { gameOver && <Endgame />}
            {(moves !== 0) && <p>{moves} moves left.</p>}
        </div>
    )
}

export default TileList
