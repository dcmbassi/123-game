import React from 'react'

import { useGame } from "../context/gameContext"

const Tile = React.memo(({value, bg}) => {
    const {storeTile} = useGame()

    /* const handleStore = () => {
        storeTile(e, {value, bg})
    } */
    
    return (
        <div className='tile' style={{backgroundColor: bg}} onClick={(e) => storeTile(e, {value, bg})}>
            {value}
        </div>
    )
})

export default Tile
