import React from 'react'
import { useGame } from '../context/gameContext'

const Cell = ({value, position}) => {
    const {placeTile} = useGame()
    
    return (
        <div className='cell' data-position={position} onClick={(e) => placeTile(e)}>
            
        </div>
    )
}

export default Cell
