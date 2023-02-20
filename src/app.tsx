import { useState } from "react"
import { Square } from "./components/Square"

export const App = () => {
	const TURN= {
		X: "❌",
		O: "⭕"
	}
	const VALUE_DEFAULT = Array(9).fill("")
	const [board,setBoard]=useState<string[]> (VALUE_DEFAULT)
	const [turn,setTurn]=useState<string>(TURN.X)
	const upDateBoard = (position:number) => {
		if(board[position])return
		const newBoard=[...board]
		newBoard[position]= turn
		setBoard(newBoard)
		const newTurn= turn === TURN.X ? TURN.O : TURN.X
		setTurn(newTurn) 
	}
	return (
		<main>
			<h1>App-tic-tac-toe</h1>
			<section>
				{board.map((item,index) => (
					<Square 
						key={index}
						position={index}
						handleClick={upDateBoard}
					>
						{item}
					
					</Square>
				))}
			</section>
		</main>
	)	
}