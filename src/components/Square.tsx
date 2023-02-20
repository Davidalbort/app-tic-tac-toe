interface SquareProps {
    children: React.ReactNode
    handleClick: (index:number) => void
    position: number
}
export const Square = ({children,position,handleClick}:SquareProps) => {
	return <div className="square" onClick={() => handleClick(position)}>  {children} </div>
    
}