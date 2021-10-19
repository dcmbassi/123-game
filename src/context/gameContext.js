import React, { useState, useContext, useCallback } from "react";
import {randomiseColors} from "../utils/randomiseColors";

const myTiles = [1, 2, 3, 4, 5, 6, 7, 8, 9]

const adjacencies = [
    [2, 4, 5],
    [1, 3, 4, 5, 6],
    [2, 5, 6],
    [1, 2, 5, 7, 8],
    [1, 2, 3, 4, 6, 7, 8, 9],
    [2, 3, 5, 8, 9],
    [4, 5, 8],
    [4, 5, 6, 7, 9],
    [5, 6, 8],
]

const GameContext = React.createContext()

export const useGame = () => useContext(GameContext)

export const GameProvider = ({children}) => {
    const [tilesArray, setTilesArray] = useState([])
    const [moves, setMoves] = useState(9)
    const [stored, setStored] = useState(null)
    const [entries, setEntries] = useState([])
    const [gameOver, setGameOver] = useState(false)
    const [won, setWon] = useState(false)

    const initGame = useCallback(() => {
        const starterTitles = myTiles.map(tile => (
            {number: tile, background: randomiseColors()}
        ))
        setTilesArray(starterTitles)
        setMoves(prev => 9)
        setEntries([])
        setWon(false)
        setGameOver(false)
        document.querySelectorAll('.cell').forEach(cell => {
            cell.innerText = ''
            cell.classList.remove('locked')
            cell.style.background = 'white'
        })
        
    }, [])

    const storeTile = (e, tile) => {
        // 1. Unselect any marked tile
        document.querySelectorAll('.tile').forEach(tile => {
            tile.classList.remove('selected')
        })
        // 2. Mark the tile as selected
        e.target.classList.add('selected')
        // 3. Save tile information in state
        setStored(prev => tile)
    }

    const placeTile = (e) => {
        if (!stored || e.target.classList.contains('locked')) return

        const pos = parseInt(e.target.dataset.position)
        
        e.target.innerText = stored.value
        e.target.style.background = stored.bg
        e.target.classList.add('locked')

        // Use data-position attribute to record (position => value) pairs
        setEntries([...entries, {cell: pos, value: stored.value}])
        setTilesArray(tilesArray.filter(t => t.number !== stored.value))
        setStored(null)
        setMoves(prev => prev - 1)
    }

    const checkWin = useCallback(() => {
        // 1. Make sure there are no moves left
        if (moves > 0) return
        let win = true
        // 2. For each cell position, check whether the adjacency array contains the value of the cell + 1
        const nineRemoved = entries.filter(entry => entry.value !== 9)
        nineRemoved.forEach(entry => {
            let adjacency = adjacencies[entry.cell - 1]
            // a. Filter the entries array to contain only the adjacency cells
            let adjacentCells = []
            adjacency.forEach(a => adjacentCells.push(entries.find(e => {
                return e.cell === a
            })))
            if (!adjacentCells.some(cell => cell.value === entry.value + 1)) win = false
        })
        setGameOver(true)
        setWon(win)
    }, [entries, moves])


    const value = {
        tilesArray,
        moves,
        stored,
        gameOver,
        won,
        initGame,
        storeTile,
        placeTile,
        checkWin,
    }

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    )
}