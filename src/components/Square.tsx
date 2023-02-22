interface SquareProps {
    children: React.ReactNode
    position: number
    isSelect?: boolean
    handleClick?: (index:number) => void
}
export const Square = ({children,position,isSelect,handleClick}:SquareProps) => {
	const style = isSelect ? "isSelect" : ""
	return <div 
		className={`square ${style}`} 
		onClick={() => handleClick? handleClick(position): null}
	>  
		{children} 
	</div>
    
}