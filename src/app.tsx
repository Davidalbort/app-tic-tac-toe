import { useState } from "react"
import { Square } from "./components/Square"

export const App = () => {
	const TURN = {
		X: "❌",
		O: "⭕",
	}
	const VALUE_DEFAULT = Array(9).fill(null)
	const [board, setBoard] = useState<string[]>(() => {
		const boardFromLocalStorage = window.localStorage.getItem("board")
		if (boardFromLocalStorage) return JSON.parse(boardFromLocalStorage)
		return VALUE_DEFAULT
	})
	const [turn, setTurn] = useState(() => {
		const turnFromLocalStorage = window.localStorage.getItem("turn")
		if (turnFromLocalStorage) return JSON.parse(turnFromLocalStorage)
		return TURN.X
	})
	const [winner, setWinner] = useState<string | null | false>(null)
	const updateBoard = (location: number): void => {
		if (board[location] || winner) return
		const newBoard = [...board]
		newBoard[location] = turn
		setBoard(newBoard)
		const newTurn = turn === TURN.X ? TURN.O : TURN.X
		setTurn(newTurn)
		saveInLocalStorage({ board: newBoard, turn: newTurn })
		const newWinner = checkWinner(newBoard)
		if (newWinner) {
			setWinner(newWinner)
		}
		if (boardIsFill(newBoard)) {
			setWinner(false)
		}
	}
	const checkWinner = (board: string[]): string | null => {
		const positionWinner = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		]
		for (const positions of positionWinner) {
			const [a, b, c] = positions

			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				return board[a]
			}
		}
		return null
	}
	interface ParametersSaveInLocalStorage {
		board: string[]
		turn: string
	}
	const saveInLocalStorage = ({ board, turn }: ParametersSaveInLocalStorage) => {
		window.localStorage.setItem("board", JSON.stringify(board))
		window.localStorage.setItem("turn", JSON.stringify(turn))
	}
	const resetGame = () => {
		window.localStorage.clear()
		setBoard(VALUE_DEFAULT)
		setTurn(TURN.X)
		setWinner(null)
	}
	const boardIsFill = (board: string[]): boolean => {
		return board.every((square) => square !== null)
	}
	return (
		<main>
			<h1>tic-tac-toe</h1>
			<button onClick={() => resetGame()}>Reset Game</button>
			<section className="board">
				{board.map((square, index) => (
					<Square key={index} position={index} handleClick={updateBoard}>
						{square}
					</Square>
				))}
			</section>
			<section className="turn">
				<h2>Turn corresponding</h2>
				<span role={"turn"}>{turn === TURN.X ? TURN.X : TURN.O}</span>
			</section>
			{winner ? (
				<section role={"winner"}>
					<p>There is a winner</p>
					<span>{winner}</span>
					<button onClick={() => resetGame()}>Start again game</button>
				</section>
			) : winner === false ? (
				<section role={"tie"}>
					<p>There is tie</p>
					<button onClick={() => resetGame()}>Start again game</button>
				</section>
			) : null}
		</main>
	)
}
