import { render, screen, fireEvent, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import CitySelect from "./CitySelect"

test("Renders an input", async () => {
    render(<CitySelect cities={[]} />)
    const textbox = screen.getByRole("combobox")
    expect(textbox).toBeVisible()
})

test("Filters and calls onChange when selecting a city", async () => {
    const onChange = jest.fn()
    render(<CitySelect cities={["Some place", "Gothenburg", "Uddevalla"]} onChange={onChange} />)

    const textbox = screen.getByRole("combobox")

    act(() => {
        textbox.focus()
    })

    fireEvent.change(textbox, { target: { value: 'Udde' } })
    fireEvent.keyDown(textbox, { key: 'ArrowDown' })
    fireEvent.keyDown(textbox, { key: 'Enter' })

    expect(onChange).toHaveBeenCalledWith("Uddevalla")
})
