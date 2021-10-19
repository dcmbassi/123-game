// import React from 'react'

import Cell from "./Cell"

const Board = () => {
    const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    return (
        <div className='board'>
            {cells.map(cell => (
                <Cell key={cell} position={cell} />
            ))}
        </div>
    )
}

export default Board
