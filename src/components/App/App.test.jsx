import { render, screen, fireEvent, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import App from './App'

const dataSet = [
    {
        city: "San Francisco",
        currentWeather: {
            temperature: 15,
            condition: "Sunny",
            icon: "sunny"
        },
        forecast: [
            {
                day: "Monday",
                temperature: 16,
                condition: "Partly Cloudy",
                icon: "partly_cloudy"
            },
            {
                day: "Tuesday",
                temperature: 17,
                condition: "Sunny",
                icon: "sunny"
            },
            {
                day: "Wednesday",
                temperature: 14,
                condition: "Rainy",
                icon: "rain"
            },
            {
                day: "Thursday",
                temperature: 15,
                condition: "Cloudy",
                icon: "cloud"
            },
            {
                day: "Friday",
                temperature: 18,
                condition: "Sunny",
                icon: "sunny"
            }
        ]
    },
]

test("Should be able to filter for city and see current weather and forecast", async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({ ok: true, json: () => dataSet }))

    render(<App />)
    const textbox = await screen.findByRole("combobox")

    const currentWeatherInformation = await screen.findByTestId("current-weather-information")
    expect(currentWeatherInformation).toBeVisible()

    act(() => {
        textbox.focus()
        fireEvent.change(textbox, { target: { value: 'San' } })
        fireEvent.keyDown(textbox, { key: 'ArrowDown' })
        fireEvent.keyDown(textbox, { key: 'Enter' })
    })

    const currentWeather = screen.getByTestId("current-weather")
    const forecast = screen.getByTestId("weather-forecast")

    expect(currentWeather).toBeVisible()
    expect(forecast).toBeVisible()
})
