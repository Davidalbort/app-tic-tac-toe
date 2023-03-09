import { App } from "./App"
import { cleanup, render, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
const board = Array(9).fill(null)
describe("<App/>", () => {
	afterEach(cleanup)
	test("Display title", () => {
		const { getByText } = render(<App />)
		const title = getByText("tic-tac-toe")
		expect(title).toBeInTheDocument()
	})
	test("Render of 9 square in board", () => {
		const { getByRole } = render(<App />)
		for (let i in board) {
			const square = getByRole(`square${i}`)
			expect(square).toBeInTheDocument()
		}
	})
	test("Display corresponding X or 0 depending of turn", async () => {
		const { getByRole } = render(<App />)
		const user = userEvent.setup()
		const square2 = getByRole("square2")
		const square3 = getByRole("square3")
		await user.click(square2)
		await user.click(square3)
		expect(square2.textContent).toEqual("❌")
		expect(square3.textContent).toEqual("⭕")
	})
	test("when clicked twice a square not overwrite its value ", async () => {
		const { getByRole } = render(<App />)
		const user = userEvent.setup()
		const square2 = getByRole("square2")
		await user.dblClick(square2)
		expect(square2.textContent).toEqual("❌")
	})
	test("Display the turn corresponding in game", async () => {
		const { getByRole } = render(<App />)
		const user = userEvent.setup()
		const sectionTurn = getByRole("turn")
		const square8 = getByRole("square8")
		expect(sectionTurn.textContent).toBe("❌")
		await user.dblClick(square8)
		expect(sectionTurn.textContent).toBe("⭕")
	})
	test("When game start, should call of key board and turn in localStorage", () => {
		// Mock localStorage in a Jest test
		Object.defineProperty(window, "localStorage", {
			value: {
				getItem: jest.fn(),
				setItem: jest.fn(),
				removeItem: jest.fn(),
				clear: jest.fn(),
			},
			writable: true,
		})
		render(<App />)
		expect(localStorage.getItem).toHaveBeenCalledWith("board")
		expect(localStorage.getItem).toHaveBeenCalledWith("turn")
	})
	test("When board changed, should save information in localStorage by not loss it", () => {
		// Mock localStorage in a Jest test
		Object.defineProperty(window, "localStorage", {
			value: {
				getItem: jest.fn(),
				setItem: jest.fn(),
				removeItem: jest.fn(),
				clear: jest.fn(),
			},
			writable: true,
		})
		const { getByRole } = render(<App />)
		const square5 = getByRole("square5")
		fireEvent.click(square5)
		const expectBoard = ["", "", "", "", "", "❌", "", "", ""]
		const expectTurn = "⭕"
		// Assert that localStorage was called with the correct values
		expect(localStorage.setItem).toHaveBeenCalledWith("board", `${JSON.stringify(expectBoard)}`)
		expect(localStorage.setItem).toHaveBeenCalledWith("turn", `${JSON.stringify(expectTurn)}`)
	})
	test("When three values are in a row of same value there should winner", () => {
		const { getByRole, getByText } = render(<App />)
		const positions = [0, 3, 1, 4, 2]
		positions.forEach((position) => {
			const square = getByRole(`square${position}`)
			fireEvent.click(square)
		})
		expect(getByText("There is a winner")).toBeInTheDocument()
	})
	test("When three values are in a column of same value there should winner", async () => {
		const { getByRole, getByText } = render(<App />)
		const positions = [0, 1, 3, 2, 6]
		positions.forEach((position) => {
			const square = getByRole(`square${position}`)
			fireEvent.click(square)
		})
		expect(getByText("There is a winner")).toBeInTheDocument()
	})
	test("When three values are in a diagonal of same value there should winner", async () => {
		const { getByRole, getByText } = render(<App />)
		const positions = [0, 1, 4, 2, 8]
		positions.forEach((position) => {
			const square = getByRole(`square${position}`)
			fireEvent.click(square)
		})
		expect(getByText("There is a winner")).toBeInTheDocument()
	})
	test("If there is a winner, not allow put value more over board", async () => {
		const { getByRole } = render(<App />)
		const positions = [0, 1, 4, 2, 8, 5]
		positions.forEach((position) => {
			const square = getByRole(`square${position}`)
			fireEvent.click(square)
		})
		expect(getByRole("square5").textContent).toBeFalsy()
	})
	test("If there is a winner, should display who winner of game", () => {
		const { getByRole } = render(<App />)
		const positions = [2, 0, 4, 3, 6]
		positions.forEach((position) => {
			const square = getByRole(`square${position}`)
			fireEvent.click(square)
		})
		expect(getByRole("winner").textContent).toEqual("There is a winner❌")
	})
})
