interface SquareProps {
	position: number
	handleClick?: (index: number) => void
	children: React.ReactNode
}
export const Square = ({ position, handleClick, children }: SquareProps) => {
	return (
		<div
			className="square"
			role={`square${position}`}
			onClick={() => (handleClick ? handleClick(position) : null)}
		>
			{children}
		</div>
	)
}
