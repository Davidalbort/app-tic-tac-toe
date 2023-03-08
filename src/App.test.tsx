import { App } from "./App"
import { cleanup, render } from "@testing-library/react"
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
})
