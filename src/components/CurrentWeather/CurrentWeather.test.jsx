import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import CurrentWeather from "./CurrentWeather"
import { formatTemperature } from "../../utils/temperature"

test("Renders current weather", async () => {
    render(
        <CurrentWeather
            weather={{
                currentWeather: {
                    temperature: 20,
                    condition: "Rainy",
                    icon: "rain"
                }
            }}
        />
    )

    const condition = screen.getByText("Rainy")
    const temperature = screen.getByText(formatTemperature(20))
    const icon = screen.getByTestId("weather-icon-rain")

    expect(condition).toBeVisible()
    expect(temperature).toBeVisible()
    expect(icon).toBeVisible()
})

test("Renders information box when no weather is available", async () => {
    render(
        <CurrentWeather
            weather={null}
        />
    )

    const information = screen.getByTestId("current-weather-information")

    expect(information).toBeVisible()
})
